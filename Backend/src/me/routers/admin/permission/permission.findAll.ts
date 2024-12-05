import { NextFunction, Request, Response } from "express";
import PermissionModel from "../../../models/permission.model";

export default async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const permissions = await PermissionModel.find({});
    res.status(200).json({ permissions });
  } catch (error) {
    next(error);
  }
}
