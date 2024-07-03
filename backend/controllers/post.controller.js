import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, description, username, profileImage, userId, categories } =
      req.body;

    let photo;
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.buffer);
      if (result) {
        photo = result.secure_url;
      }
    }
    
    if (!photo) {
      throw new ApiError(400, "Photo is required");
    }

    const newPost = new Post({
      title,
      description,
      username,
      profileImage,
      userId,
      categories,
      photo,
    });
    const savedPost = await newPost.save();

    return res
      .status(200)
      .json(new ApiResponse(200, savedPost, "Post created successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const { title, description, username, profileImage, userId, categories } =
      req.body;
    const photoLocalPath = req.file?.path;

    let updatedFields = {
      title,
      description,
      username,
      profileImage,
      userId,
      categories,
    };

    if (photoLocalPath) {
      const photo = await uploadOnCloudinary(photoLocalPath);
      if (!photo) {
        throw new ApiError(400, "Photo is required");
      }
      updatedFields.photo = photo.url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    //   await Comment.deleteMany({ postId: req.params.id });

    return res
      .status(201)
      .json(new ApiResponse(200, {}, "Post has been deleted!"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const getPostDetails = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(200, post, "Post details fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const query = req.query.search
      ? { $text: { $search: req.query.search } }
      : {};
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    const posts = await Post.find(query).skip(skip).limit(limit);

    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const getUserPost = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    // console.log("userId: ", req.params.userId);

    return res
      .status(200)
      .json(new ApiResponse(200, posts, "User posts fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

export {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPost,
  getPostDetails,
};
