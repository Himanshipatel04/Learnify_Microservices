import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    postedBy: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
      profilePicture: { type: String },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    domain: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    abstract: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoLink: {
      type: String,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
