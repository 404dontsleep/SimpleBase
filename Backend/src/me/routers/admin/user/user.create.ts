import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user.model";
import MyError from "../../../message/errors";
import { sha256 } from "../../../utils/crypt";
import MyMessage from "../../../message/message";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) throw MyError("EMAIL_ALREADY_EXISTS");

    const _user = await UserModel.create({
      email,
      password: sha256(password),
    });
    const __user = await UserModel.findById(_user._id).select("-password");
    res.status(201).json({
      message: MyMessage("USER_CREATED_SUCCESSFULLY"),
      user: __user,
    });
  } catch (error) {
    next(error);
  }
}
