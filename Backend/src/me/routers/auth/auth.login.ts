import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { sha256 } from "../../utils/crypt";
import { sign } from "jsonwebtoken";
import config from "../../../config/config";
import MyError from "../../message/errors";
import MyMessage from "../../message/message";

export default async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw MyError("EMAIL_AND_PASSWORD_REQUIRED");

    const user = await UserModel.findOne({ email, password: sha256(password) });
    if (!user) throw MyError("EMAIL_OR_PASSWORD_INVALID");

    const payload = { user: { _id: user._id } };
    const token = sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: MyMessage("LOGIN_SUCCESS"), token });
  } catch (error) {
    next(error);
  }
}
