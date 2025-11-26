import { Router } from "express";
import conversationRoutes from "./conversation.routes";
import messageRoutes from "./message.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use("/conversation", conversationRoutes);
routes.use("/message", messageRoutes);
routes.use("/user", userRoutes);

export default routes;
