import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { sha256 } from "../../utils/crypt";
import { IAuthRequest } from "../../middlewares/auth.middleware";
import { signToken } from "../../utils/tokenHelper";
import config from "../../../config/config";
import MyError from "../../message/errors";
import MyMessage from "../../message/message";

export default async function authVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const decode = (req as IAuthRequest).decode;

    if (!decode.verify) throw MyError("UNKNOW_ACTION");
    const user = await UserModel.findById(decode.verify._id);
    if (!user) throw MyError("EMAIL_NOT_FOUND");
    const { code } = req.body;
    if (!code) throw MyError("CODE_IS_REQUIRED");
    if (sha256(code, config.SALT) !== decode.verify.code)
      throw MyError("CODE_IS_INVALID");

    user.verified = true;
    await user.save();
    const token = signToken({ user: { _id: user._id } });
    res.status(200).json({
      message: MyMessage("EMAIL_VERIFICATION_SUCCESS"),
      token,
    });
  } catch (error) {
    next(error);
  }
}
