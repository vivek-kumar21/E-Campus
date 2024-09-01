import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    photo: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    editorCollege: {
      type: String,
    },
    editorDesignation: {
      type: String,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

postSchema.index({ title: "text", content: "text" });

export const Post = mongoose.model("Post", postSchema);
