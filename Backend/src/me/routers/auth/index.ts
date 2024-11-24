import { Router } from "express";
import authLogin from "./auth.login";
import authRegister from "./auth.register";
import authVerify, { authVerifySendEmail } from "./auth.verify";
import authMe from "./auth.me";

const AuthRouter = Router();

AuthRouter.post("/login", authLogin);
AuthRouter.post("/register", authRegister);
AuthRouter.post("/verify", authVerify);
AuthRouter.get("/resend", authVerifySendEmail);
AuthRouter.get("/me", authMe);

export default AuthRouter;
