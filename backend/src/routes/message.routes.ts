import { Router } from "express";
import multer from "multer";
import path from "path";
import { MessageControllers } from "../controllers/message.controllers";
import authMiddleware from "../middleware/authMiddleware";

const messageRoutes = Router();

messageRoutes.use(authMiddleware);
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "uploads/");
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
messageRoutes.post(
  "/:conversationId/chat",
  upload.single("file"),
  MessageControllers.liveChat
);

export default messageRoutes;
