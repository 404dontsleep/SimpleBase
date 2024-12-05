import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user.model";
import MyError from "../../../message/errors";
import { sha256 } from "../../../utils/crypt";
import PermissionModel from "../../../models/permission.model";
import MyMessage from "../../../message/message";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password, permission, blocked, verified, _id } = req.body;

    const user = await UserModel.findById(_id);
    if (!user) throw MyError("EMAIL_NOT_FOUND");

    if (password !== undefined && typeof password === "string")
      user.password = sha256(password);
    if (blocked !== undefined && typeof blocked === "boolean")
      user.blocked = blocked;
    if (verified !== undefined && typeof verified === "boolean")
      user.verified = verified;
    if (permission !== undefined && Array.isArray(permission)) {
      const permissions = [];
      for (const p of permission) {
        const permission = await PermissionModel.findOne({ _id: p });
        if (permission) permissions.push(permission._id);
      }
      user.permission = permissions;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(_id, user, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: MyMessage("USER_UPDATED_SUCCESSFULLY"),
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}
