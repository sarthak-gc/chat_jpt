import { Router } from "express";
import { ConversationControllers } from "../controllers/conversation.controllers";
import authMiddleware from "../middleware/authMiddleware";
const conversationRoutes = Router();

conversationRoutes.use(authMiddleware);
conversationRoutes.post("/", ConversationControllers.createConversation);
conversationRoutes.get("/all", ConversationControllers.getConversationTitles);
conversationRoutes.get("/:id", ConversationControllers.getConversationMessages);

export default conversationRoutes;
