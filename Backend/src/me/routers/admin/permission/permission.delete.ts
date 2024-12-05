import { NextFunction, Request, Response } from "express";
import PermissionModel from "../../../models/permission.model";
import MyError from "../../../message/errors";

export default async function deletePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req.body;
    const permission = await PermissionModel.findOneAndDelete({
      _id,
      editable: true,
    });
    if (!permission) throw MyError("PERMISSION_NOT_FOUND");
    res.status(200).json({ permission });
  } catch (error) {
    next(error);
  }
}
