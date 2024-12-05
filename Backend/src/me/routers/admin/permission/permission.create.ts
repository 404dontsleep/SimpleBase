import { NextFunction, Request, Response } from "express";
import PermissionModel from "../../../models/permission.model";

export default async function createPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;
    const permission = await PermissionModel.create({ name, editable: true });
    res.status(201).json({ permission });
  } catch (error) {
    next(error);
  }
}
