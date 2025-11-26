import { Router } from "express";
import conversationRoutes from "./conversation.routes";
import messageRoutes from "./message.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use("/conversation", conversationRoutes);
routes.use("/message", messageRoutes);
routes.use("/user", userRoutes);
routes.get("/test", (req, res) => {
  res.cookie("token", "from-test", {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({
    msg: "Success",
  });
});

routes.get("/test-redirect", (req, res) => {
  res.cookie("red_token", "from-redirect", {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect("https://chat-jpt-eight.vercel.app/redirect-success");
});

export default routes;
