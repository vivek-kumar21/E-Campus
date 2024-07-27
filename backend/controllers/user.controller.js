import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

import { mailSender } from "../utils/mailSender.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeRefresh: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

/****************************************************REGISTER USER****************************************************/
const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user details from frontend
  // 2. Validation - not empty
  // 3. Check if user already exists: username, email
  // 4. Check for images, check for avatar
  // 5. Upload them to cloudinary, avatar
  // 6. Create user object - create entry in db
  // 7. Remove password and refresh tokren field from response
  // 8. Check for user creation
  // 9. Return response

  // 1. Get user details from frontend
  const { email, username, password } = req.body;
  // console.log("Email: ", email);

  // 2. Validation - not empty
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // 3. Check if user already exists: username, email
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  let avatar;
  if (req.file) {
    const result = await uploadOnCloudinary(req.file.buffer);
    if (result) {
      avatar = result.secure_url;
    }
  }

  // 6. Create user object - create entry in db
  const user = await User.create({
    avatar,
    email,
    password,
    username: username.toLowerCase(),
  });

  // 7. Remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // "-" is a shortcut to ensure that password and refresh token will not go with response
  );

  // 8. Check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 9. Return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

/*************************************************EMAIL VERIFICATION*************************************************/
const otp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "User is already registered"));
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    return res
      .status(200)
      .json(new ApiResponse(200, otp, "OTP sent successfully"));
  } catch (error) {
    console.log(error.message);
  }
});

/*****************************************************LOGIN USER*****************************************************/
const loginUser = asyncHandler(async (req, res) => {
  // 1. Take data from request body
  // 2. Check if username and email are there or not
  // 3. Find the user
  // 4. Password check
  // 5. If password is correct then generate access and refersh token
  // 6. send cookies
  // 7. Send response

  // 1. Take data from request body
  const { email, username, password } = req.body;

  // 2. Check if username and email are there or not
  if (!username && !email) {
    throw new ApiError(400, "Username or password is required");
  }

  // 3. Find the user
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // 4. Password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // 5. If password is correct then generate access and refersh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // 6. send cookies
  const loggedInUser = await User.findById(user.id).select(
    "-password -refreshToken"
  );
  const options = {
    // if we use options then cookies can only be modified in server and not from frontend
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const validateEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const domain = email.split("@")[1];
  const options = {
    method: "GET",
    url: "https://mailcheck.p.rapidapi.com/",
    params: { domain },
    headers: {
      "x-rapidapi-key": "517608fa6bmsh74a79f85d1e8843p11f098jsn6fa330e310aa",
      "x-rapidapi-host": "mailcheck.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const is_valid = response.data.disposable === false;
    res.json({ is_valid });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/****************************************************REFETCH USER****************************************************/
const refetchUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(200).json(new ApiResponse(200, err, ""));
    }

    res.status(200).json(new ApiResponse(200, data, ""));
  });
});

/*****************************************************LOGOUT USER*****************************************************/
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

/************************************************REFRESH ACCESS TOKEN*************************************************/
const refreshAccessToken = asyncHandler(async (req, _) => {
  // we need to refresh or renew our access token when the session expires, we can do it by matching the refresh tokens from the user and the token data stored in DB
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);

    const user = User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refesh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return response
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .josn(
        new ApiResponse(
          200,
          { accessToken, refershToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

/************************************************PASSWORD CHANGE OTP*************************************************/
const passwordOtp = asyncHandler(async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(new ApiResponse(401, {}, "User not found!"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid password");
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpPayload = { email, otp, oldPassword, newPassword };
    await OTP.create(otpPayload);

    return res
      .status(200)
      .json(new ApiResponse(200, otp, "OTP sent successfully"));
  } catch (error) {
    console.log(error.message);
  }
});

/*********************************************CHANGE CURRENT USER PASSWORD********************************************/
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

  if (response.length === 0 || otp !== response[0].otp) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "The OTP is not valid"));
  }

  const user = await User.findOne({ email });
  const { newPassword } = response[0];

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

/***************************************************FORGOT PASSWORD***************************************************/
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User not found!!");
    }

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

    const message = `
    <h1>Password Reset</h1>
    <p>Please use the following link to reset your password:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;

    await mailSender(email, "Password Reset Request", message);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          resetUrl,
          "Reset password link created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(400, "Error while creating link: ", error);
  }
});

/***********************************************RESET PASSWORD CHANGE***********************************************/
const resetPasswordChange = asyncHandler(async (req, res) => {
  const { id, token, password } = req.body;
  // const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });

  if (!oldUser) {
    throw new ApiError(400, "User not found!!");
  }

  const secret = process.env.JWT_SECRET;
  try {
    // const verify = jwt.verify(token, secret);
    // once everything is checked properly, we encrypt the password and update it into our database
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully"));
  } catch (error) {
    throw new ApiError(400, "Error while updating password");
  }
});

/***************************************************GET CURRENT USER**************************************************/
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

/************************************************UPDATE ACCOUNT DETAILS***********************************************/
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, college, designation } = req.body;
  // console.log(email);

  if (!email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        email: email,
        college: college,
        designation: designation,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

/****************************************************UPDATE AVATAR***************************************************/
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar file");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar is updated successfully"));
});

/**************************************************GET ACCOUNT DETAILS************************************************/
const getAccountDetails = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user?._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details fetched successfully"));
});

export {
  registerUser,
  loginUser,
  otp,
  validateEmail,
  logoutUser,
  refreshAccessToken,
  passwordOtp,
  changeCurrentPassword,
  forgotPassword,
  resetPasswordChange,
  getCurrentUser,
  updateAccountDetails,
  refetchUser,
  updateUserAvatar,
  getAccountDetails,
};
