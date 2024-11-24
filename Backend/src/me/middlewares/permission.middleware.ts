import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "./auth.middleware";
import PermissionModel from "../models/permission.model";
import UserType from "@MyTypes/user.type";
import RouterModel from "../models/router.model";
import MyError from "../message/errors";

export default async function permissionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as IAuthRequest).decode.auth;
    if (!(await canUserRequest(req, user))) throw MyError("PERMISSION_DENIED");
    next();
  } catch (error) {
    next(error);
  }
}
async function canUserRequest(request: Request, user?: UserType) {
  const baseRouter = await RouterModel.findOne({
    path: request.baseUrl,
    method: "USE",
  });
  const pathPermissions = await RouterModel.findOne({
    path: request.baseUrl + request.path,
    method: request.method.toUpperCase(),
  });
  if (baseRouter && pathPermissions) {
    if (user) {
      return canRequest(
        [baseRouter.permission, pathPermissions.permission],
        user.permission
      );
    } else {
      const guestPermission = await findOrCreatePermission("guest", "Guest");
      return canRequest(
        [baseRouter.permission, pathPermissions.permission],
        [guestPermission._id.toString()]
      );
    }
  }
  return false;
}
async function canRequest(
  pathPermissions: string[],
  permissions: string[],
  checked: string[] = []
) {
  permissions = permissions.filter(
    (permission) => !checked.includes(permission)
  );
  checked.push(...permissions);
  for (const permission of permissions) {
    if (pathPermissions.includes(permission)) {
      return true;
    } else {
      const childrenPermission = await PermissionModel.findOne({
        _id: permission,
      });
      if (
        childrenPermission &&
        (await canRequest(
          pathPermissions,
          childrenPermission.children,
          checked
        ))
      ) {
        return true;
      }
    }
  }
  return false;
}
export async function findOrCreatePermission(
  name: string,
  description?: string
) {
  return (
    (await PermissionModel.findOne({ name })) ||
    (await PermissionModel.create({ name, description }))
  );
}
