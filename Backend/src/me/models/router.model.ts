import RouterType from "@MyTypes/router.type";
import mongoose, { Schema } from "mongoose";

const routerSchema = new Schema<RouterType>(
  {
    path: { type: String, required: true },
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "USE"],
    },
    permission: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RouterModel = mongoose.model<RouterType>("Router", routerSchema);

export default RouterModel;
