import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "../../middlewares/auth.middleware";
import UserModel from "../../models/user.model";
import MyError from "../../message/errors";
import { randomString, sha256 } from "../../utils/crypt";
import { sendVerifyEmail } from "../../utils/sendMail";
import { ITokenPayload, signToken } from "../../utils/tokenHelper";
import config from "../../../config/config";
import MyMessage from "../../message/message";

export async function authSendOTP(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body; // IF RESET PASSWORD

    const decode = (req as IAuthRequest).decode;

    let realEmail = decode.auth?.email || email;
    // IF VERIFY SOMETHING EX: Change password

    if (decode.verify?._id) {
      const user = await UserModel.findById(decode.verify._id);
      if (!user) throw MyError("EMAIL_NOT_FOUND");
      realEmail = user.email;
    }
    // IF LOGIN BUT NOT VERIFIED

    const user = await UserModel.findOne({
      email: realEmail,
    });
    if (!user) throw MyError("EMAIL_NOT_FOUND");

    if (
      decode.verify &&
      Date.now() - new Date(decode.verify.lastSendTime).getTime() < 120000
    )
      throw MyError("REQUEST_RATE_LIMIT_EXCEEDED");

    const code = randomString(10);
    await sendVerifyEmail(realEmail, code);
    const FIVE_MINUTES = 5 * 60 * 1000;
    const payload: ITokenPayload = {
      user: decode.auth ? { _id: user._id } : undefined,
      verify: {
        code: sha256(code, config.SALT),
        lastSendTime: new Date(),
        _id: user._id,
        expiresTime: new Date(Date.now() + FIVE_MINUTES),
      },
    };
    const token = signToken(payload);
    res.status(200).json({ message: MyMessage("SEND_EMAIL_SUCCESS"), token });
  } catch (error) {
    next(error);
  }
}
