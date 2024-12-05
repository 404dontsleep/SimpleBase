import { Router } from "express";
import { findAll } from "./user.findAll";
import { createUser } from "./user.create";
import { updateUser } from "./user.update";
import findOne from "./user.findOne";

const AdminUserRouter = Router();

AdminUserRouter.post("/findOne", findOne);
AdminUserRouter.post("/findAll", findAll);
AdminUserRouter.post("/create", createUser);
AdminUserRouter.post("/update", updateUser);

export default AdminUserRouter;
