import PermissionType from "@MyTypes/permission.type";
import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema<PermissionType>(
  {
    name: { type: String, required: true, lowercase: true, unique: true },
    description: { type: String, required: false },
    config: { type: Object, default: {} },
    children: {
      type: [String],
      default: [],
    },
    editable: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const PermissionModel = mongoose.model<PermissionType>(
  "Permission",
  permissionSchema
);

export default PermissionModel;
