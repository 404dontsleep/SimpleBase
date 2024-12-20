import { Router } from "express";
import AuthRouter from "./auth";
import catchResponse from "../utils/catchResponse";
import authMiddleware from "../middlewares/auth.middleware";
import permissionMiddleware from "../middlewares/permission.middleware";
import verifyMiddleware from "../middlewares/verify.middleware";
import AdminRouter from "./admin";

const MainRouter = Router();
MainRouter.use([authMiddleware, verifyMiddleware, permissionMiddleware]);
MainRouter.use("/auth", AuthRouter);
MainRouter.use("/admin", AdminRouter);
MainRouter.use(catchResponse);
export default MainRouter;
