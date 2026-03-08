import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    user: {
      userId: { type: String, required: true }, 
      name: { type: String, required: true },
      profilePicture: { type: String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

CommentSchema.index({ projectId: 1, "user.userId": 1 }, { unique: true });

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
