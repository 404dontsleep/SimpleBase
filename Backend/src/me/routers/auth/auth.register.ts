import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user.model";
import { randomString, sha256 } from "../../utils/crypt";
import config from "../../../config/config";
import { signToken } from "../../utils/tokenHelper";
import { sendVerifyEmail } from "../../utils/sendMail";
import MyError from "../../message/errors";
import MyMessage from "../../message/message";
import { findOrCreatePermission } from "../../middlewares/permission.middleware";

export default async function authRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw MyError("EMAIL_AND_PASSWORD_REQUIRED");

    const isMailExist = await UserModel.findOne({ email });
    if (isMailExist) throw MyError("EMAIL_ALREADY_EXISTS");
    const permission = await findOrCreatePermission(
      "default",
      "Default permission"
    );
    const user = await UserModel.create({
      email,
      password: sha256(password),
      permission: [permission._id],
    });
    if (!user) throw MyError("EMAIL_OR_PASSWORD_INVALID");
    const code = randomString(10);
    await sendVerifyEmail(email, code);
    const token = signToken(
      {
        verify: {
          code: sha256(code, config.SALT),
          lastSendTime: new Date(),
          _id: user._id,
        },
      },
      { expiresIn: "5m" }
    );

    res.status(200).json({ message: MyMessage("REGISTER_SUCCESS"), token });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
