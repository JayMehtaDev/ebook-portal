import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);

authRouter.post("/login", validate(loginSchema), login);

authRouter.post("/logout", logout);

export default authRouter;
