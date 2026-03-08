import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
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

LikeSchema.index({ projectId: 1, "user.userId": 1 }, { unique: true });

const LikeModel = mongoose.model("Like", LikeSchema);

export default LikeModel;
