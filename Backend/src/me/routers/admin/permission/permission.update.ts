import { NextFunction, Request, Response } from "express";
import PermissionModel from "../../../models/permission.model";
import MyError from "../../../message/errors";

export default async function updatePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id, name, children, config, description } = req.body;
    const permission = await PermissionModel.findById(_id);
    if (!permission) throw MyError("PERMISSION_NOT_FOUND");
    if (permission.editable) {
      permission.name = name;
      const childrenPermission = [];
      if (children && Array.isArray(children)) {
        for (const child of children) {
          const permission = await PermissionModel.findById(child);
          if (permission) childrenPermission.push(permission._id);
        }
        permission.children = childrenPermission;
      }
      if (description) permission.description = description;
      if (config) permission.config = config;
      const updatedPermission = await PermissionModel.findByIdAndUpdate(
        _id,
        permission,
        { new: true }
      );
      res.status(200).json({ permission: updatedPermission });
    } else if (["root", "guest", "default"].includes(permission.name)) {
      const childrenPermission = [];
      if (children && Array.isArray(children)) {
        for (const child of children) {
          const permission = await PermissionModel.findById(child);
          if (permission) childrenPermission.push(permission._id);
        }
        permission.children = childrenPermission;
      }
      if (config) permission.config = config;
      const updatedPermission = await PermissionModel.findByIdAndUpdate(
        _id,
        permission,
        { new: true }
      );
      res.status(200).json({ permission: updatedPermission });
    } else {
      if (config) permission.config = config;
      const updatedPermission = await PermissionModel.findByIdAndUpdate(
        _id,
        permission,
        { new: true }
      );
      res.status(200).json({ permission: updatedPermission });
    }
  } catch (error) {
    next(error);
  }
}
