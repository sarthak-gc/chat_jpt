import { ModelMessage } from "ai";
import { Request, Response } from "express";
import { ConversationServices } from "../services/conversation.services";
import { MessageServices } from "../services/message.services";
import { getAiResponse } from "../utils/ai";
import { getMemories } from "../utils/mem0";
import { conversationNotFound } from "../utils/return/returns";

export const MessageControllers = {
  liveChat: async (req: Request, res: Response) => {
    const userId = req.userId;
    const conversationId = req.params.conversationId;

    const message = req.body.message || {};

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let msgId = "";

    try {
      const conversation = await ConversationServices.get(conversationId);
      if (!conversation) {
        conversationNotFound(res);
        return;
      }

      if (conversation.title == "New chat") {
        const trimmedMessage = message.substring(0, 50);
        await ConversationServices.updateTitle(conversationId, trimmedMessage);
      }
      const newMessage = await MessageServices.create(
        conversationId,
        message,
        "User",
        "TEXT"
      );
      msgId = newMessage.id;
      const userInformation = await getMemories(userId, message);
      const aiMessages = await ConversationServices.getMessagesForAI(
        conversationId,
        0
      );

      const messageWithValidType: ModelMessage[] = aiMessages.map((msg) => {
        return {
          role: "assistant",
          content: msg.content,
        };
      });

      const streams = getAiResponse(
        message,
        userInformation,
        messageWithValidType
      );

      let wholeResponse = "";

      for await (const chunk of streams) {
        wholeResponse += chunk;
        res.write(`${chunk}`);
      }

      res.end();
      await MessageServices.create(conversationId, wholeResponse, "AI", "TEXT");
    } catch (err) {
      await prisma.message.delete({
        where: {
          id: msgId,
        },
      });
      res.write("data: [ERROR]\n\n");
      res.end();
    }
  },
};
