import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  getAccountDetails,
  getCurrentUser,
  loginUser,
  logoutUser,
  otp,
  passwordOtp,
  refetchUser,
  refreshAccessToken,
  registerUser,
  resetPasswordChange,
  resetPasswordCheck,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    // this is a middleware which upload the avatar and cover image locally, in this case in /public
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/send-otp").post(otp);
router.route("/account-details").get(verifyJWT, getAccountDetails);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id/:token").get(resetPasswordCheck);
router.route("/reset-password/:id/:token").post(resetPasswordChange);
router.route("/current-user").get(verifyJWT, getCurrentUser);
// router.route("/refetch").get(refetchUser);

// Profile updation routes
router.route("/update-account").put(verifyJWT,updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// password change routes
router.route("/send-passwordOtp").post(passwordOtp);
router.route("/change-password").post(changeCurrentPassword);

export default router;
