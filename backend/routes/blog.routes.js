import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostDetails,
  getUserPost,
  updatePost,
} from "../controllers/post.controller.js";
import {
  createComment,
  deleteComment,
  getPostComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// posts routes
router.route("/posts/").get(getAllPosts);
router.route("/posts/create").post(upload.single("photo"), createPost);
router.route("/posts/:id").put(updatePost);
router.route("/posts/:id").delete(deletePost);
router.route("/posts/:id").get(getPostDetails);
router.route("/posts/user/:userId").get(getUserPost);

// comments routes
router.route("/comments/:id").get(getPostComment);
router.route("/comments/create").post(createComment);
router.route("/comments/:id").put(updateComment);
router.route("/comments/:id").delete(deleteComment);

export default router;
