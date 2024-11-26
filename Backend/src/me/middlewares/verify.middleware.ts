import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "./auth.middleware";
export default async function verifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const decode = (req as IAuthRequest).decode;
    if (decode.verify) {
      const isExpired =
        decode.verify.expiresTime &&
        new Date(decode.verify.expiresTime).getTime() < Date.now();
      if (isExpired) {
        (req as IAuthRequest).decode.verify = undefined;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
