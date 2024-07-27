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
  refreshAccessToken,
  registerUser,
  resetPasswordChange,
  updateAccountDetails,
  updateUserAvatar,
  validateEmail,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);
router.route("/send-otp").post(otp);
router.route("/account-details").get(verifyJWT, getAccountDetails);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPasswordChange);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/validate-email").post(validateEmail);

// Profile updation routes
router.route("/update-account").put(verifyJWT,updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// password change routes
router.route("/send-passwordOtp").post(passwordOtp);
router.route("/change-password").post(changeCurrentPassword);

export default router;
