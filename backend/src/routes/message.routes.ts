import { Router } from "express";
import { MessageControllers } from "../controllers/message.controllers";
import authMiddleware from "../middleware/authMiddleware";

const messageRoutes = Router();

messageRoutes.use(authMiddleware);
messageRoutes.post("/:conversationId/chat", MessageControllers.liveChat);

export default messageRoutes;
