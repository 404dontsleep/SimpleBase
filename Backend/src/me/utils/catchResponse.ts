import { NextFunction, Request, Response } from "express";
export default function catchResponse(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  if (err.name === "TokenExpiredError")
    res.status(401).json({ message: err.message });
  else res.status(500).json({ message: err.message, error: err.stack });
}
