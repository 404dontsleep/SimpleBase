import { NextFunction, Request, Response } from "express";
import MyError from "../../message/errors";
import UserModel from "../../models/user.model";
import { randomString, sha256 } from "../../utils/crypt";
import { sendVerifyEmail } from "../../utils/sendMail";
import { ITokenPayload, signToken } from "../../utils/tokenHelper";
import config from "../../../config/config";
import MyMessage from "../../message/message";
import { IAuthRequest } from "../../middlewares/auth.middleware";

export default async function authResetPass(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const decode = (req as IAuthRequest).decode;

    if (!decode.verify) throw MyError("UNKNOW_ACTION");

    const { code, password } = req.body;
    const user = await UserModel.findById(decode.verify._id);
    if (!user) throw MyError("EMAIL_NOT_FOUND");

    if (sha256(code, config.SALT) !== decode.verify.code)
      throw MyError("CODE_IS_INVALID");

    user.password = sha256(password);
    await user.save();

    const payload: ITokenPayload = {
      user: { _id: user._id },
    };
    const token = signToken(payload);
    res
      .status(200)
      .json({ message: MyMessage("RESET_PASSWORD_SUCCESS"), token });
  } catch (error) {
    next(error);
  }
}
