import { Router } from "express";
import AuthRouter from "./auth";
import catchResponse from "../utils/catchResponse";
import authMiddleware from "../middlewares/auth.middleware";
import permissionMiddleware from "../middlewares/permission.middleware";

const MainRouter = Router();
MainRouter.use([authMiddleware, permissionMiddleware]);
MainRouter.use("/auth", AuthRouter);
MainRouter.use(catchResponse);
export default MainRouter;
