import mongoose, { Schema } from "mongoose";

const internshipSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
      required: true,
    },
    openings: {
      type: String,
    },
    skills: {
      type: Array,
    },
    applyLink: {
      type: String,
    },
  },
  { timestamps: true }
);

internshipSchema.index({ role: "text", companyName: "text", location: "text" });

export const Internship = mongoose.model("Internship", internshipSchema);
