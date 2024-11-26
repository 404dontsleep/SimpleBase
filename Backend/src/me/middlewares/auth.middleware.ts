import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { verifyToken } from "../utils/tokenHelper";
import MyError from "../message/errors";
export interface IAuthRequest extends Request {
  decode: ReturnType<typeof verifyToken>;
}
export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    (req as IAuthRequest).decode = {};
    if (token) {
      const decode = verifyToken(token);
      if (decode) (req as IAuthRequest).decode = decode;
      if (decode && decode.user) {
        const user = await UserModel.findById(decode.user._id).select(
          "-password"
        );
        if (!user) throw MyError("EMAIL_NOT_FOUND");
        if (!user.verified) throw MyError("EMAIL_NOT_VERIFIED");
        if (user.blocked) throw MyError("EMAIL_BLOCKED");
        (req as IAuthRequest).decode.auth = user;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
