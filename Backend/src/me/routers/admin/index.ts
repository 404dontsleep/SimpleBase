import { Router } from "express";
import AdminUserRouter from "./user";
import AdminPermissionRouter from "./permission";

const AdminRouter = Router();

AdminRouter.use("/user", AdminUserRouter);
AdminRouter.use("/permission", AdminPermissionRouter);

export default AdminRouter;
