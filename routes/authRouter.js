import express from "express";
import authControllers from "../controllers/authControllers.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import { validateBody } from "../helpers/index.js";
import { authenticate } from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), authControllers.registerController);
authRouter.post("/login", validateBody(authLoginSchema), authControllers.loginController);
authRouter.post("/logout", authenticate, authControllers.logoutController);
authRouter.get("/current", authenticate, authControllers.getCurrentUserController);

export default authRouter;