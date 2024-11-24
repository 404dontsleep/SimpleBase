import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { randomString, sha256 } from "../../utils/crypt";
import { IAuthRequest } from "../../middlewares/auth.middleware";
import { sendVerifyEmail } from "../../utils/sendMail";
import { ITokenPayload, signToken } from "../../utils/tokenHelper";
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

    const user = await UserModel.findById(decode.user?._id);
    if (!user) throw MyError("EMAIL_NOT_FOUND");
    if (!decode.verify || user.verified)
      throw MyError("EMAIL_ALREADY_VERIFIED");

    const { code } = req.body;
    if (!code) throw MyError("CODE_IS_REQUIRED");
    if (sha256(code, config.SALT) !== decode.verify.code)
      throw MyError("CODE_IS_INVALID");

    user.verified = true;
    await user.save();
    const token = signToken({ user: { _id: user._id, check: true } });
    res.status(200).json({
      message: MyMessage("EMAIL_VERIFICATION_SUCCESS"),
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function authVerifySendEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const decode = (req as IAuthRequest).decode;
    const user = await UserModel.findById(decode.user?._id);
    if (!user) throw MyError("EMAIL_NOT_FOUND");
    if (!decode.verify || user.verified)
      throw MyError("EMAIL_ALREADY_VERIFIED");
    const lastSendTime = new Date(decode.verify.lastSendTime);
    if (Date.now() - lastSendTime.getTime() < 120000)
      throw MyError("REQUEST_RATE_LIMIT_EXCEEDED");

    const email = user.email;
    const code = randomString(10);
    await sendVerifyEmail(email, code);
    const payload: ITokenPayload = {
      user: { _id: user._id, check: false },
      verify: {
        code: sha256(code, config.SALT),
        lastSendTime: new Date(),
      },
    };
    const token = signToken(payload, {
      expiresIn: "5m",
    });
    res.status(200).json({ message: MyMessage("SEND_EMAIL_SUCCESS"), token });
  } catch (error) {
    next(error);
  }
}
