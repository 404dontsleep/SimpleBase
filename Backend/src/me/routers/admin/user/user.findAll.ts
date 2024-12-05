import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user.model";

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, page, email, blocked, verified } = req.body;
    const response = {
      total: 0,
      totalPage: 1,
      currentPage: 1,
      users: [],
    };
    let users: any = [];
    if (
      email !== undefined ||
      blocked !== undefined ||
      verified !== undefined
    ) {
      users = await UserModel.find({
        ...(email !== undefined
          ? { email: { $regex: email, $options: "i" } }
          : {}),
        ...(blocked !== undefined ? { blocked } : {}),
        ...(verified !== undefined ? { verified } : {}),
      }).select("-password");
    } else {
      users = await UserModel.find({}).select("-password");
    }

    response.users = users;
    response.total = users.length;

    if (limit && page) {
      response.totalPage = Math.ceil(response.total / limit);
      response.currentPage = page;
      response.users = users.slice((page - 1) * limit, page * limit);
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
