import { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminModel extends Model<IAdmin> {}

export const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

AdminSchema.index({ email: 1 });
AdminSchema.index({ username: 1 });
AdminSchema.index({ role: 1 });

AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
