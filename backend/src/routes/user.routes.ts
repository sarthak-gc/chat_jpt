import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.get("/oauth/callback", UserControllers.oauthSignup);
userRoutes.post("/logout", UserControllers.logout);
userRoutes.get("/me", authMiddleware, UserControllers.verifyToken);

export default userRoutes;
