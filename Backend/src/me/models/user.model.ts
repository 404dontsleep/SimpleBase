import UserType from "@MyTypes/user.type";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: { type: String, required: true },
    permission: { type: [String], default: [] },
    verified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserType>("User", userSchema);

export default UserModel;
