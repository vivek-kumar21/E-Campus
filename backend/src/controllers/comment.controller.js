import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, savedComment, "Comment created successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    await Comment.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

const getPostComment = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId });

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comment fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

export { createComment, updateComment, deleteComment, getPostComment };
