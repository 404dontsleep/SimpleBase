import { NextFunction, Request, Response } from "express";

export default function authMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as any).decode.auth;
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(200).json({
        user: {
          isGuest: true,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
