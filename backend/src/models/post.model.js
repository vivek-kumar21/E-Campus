import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
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
    userId: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
