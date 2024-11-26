import { Router } from "express";
import authLogin from "./auth.login";
import authRegister from "./auth.register";
import authVerify from "./auth.verify";
import authMe from "./auth.me";
import authResetPass from "./auth.reset";
import { authSendOTP } from "./auth.sendotp";

const AuthRouter = Router();

AuthRouter.post("/login", authLogin);
AuthRouter.post("/register", authRegister);
AuthRouter.post("/verify", authVerify);
AuthRouter.post("/sendotp", authSendOTP);
AuthRouter.post("/reset", authResetPass);
AuthRouter.get("/me", authMe);

AuthRouter.post("/forget", authResetPass);

export default AuthRouter;
