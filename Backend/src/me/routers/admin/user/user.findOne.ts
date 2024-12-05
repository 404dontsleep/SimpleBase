import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user.model";
import MyError from "../../../message/errors";

export default async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req.body;
    const user = await UserModel.findById(_id).select("-password");
    if (!user) throw MyError("EMAIL_NOT_FOUND");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}
