import { ModelMessage } from "ai";
import { Request, Response } from "express";
import path from "path";
import { ConversationServices } from "../services/conversation.services";
import { MessageServices } from "../services/message.services";
import { getAiResponseText } from "../utils/ai";
import { getMemories, setMemories } from "../utils/mem0";
import { conversationNotFound } from "../utils/return/returns";

export const MessageControllers = {
  liveChat: async (req: Request, res: Response) => {
    const userId = req.userId;
    const conversationId = req.params.conversationId;

    const message = req.body.message || {};
    const file = req.file;

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

      const aiMessages = await ConversationServices.getMessagesForAI(
        conversationId,
        0
      );

      const messageWithValidType: ModelMessage[] = aiMessages.map(
        (msg: any) => {
          return {
            role: "assistant",
            content: msg.content,
          };
        }
      );

      let streams: AsyncGenerator<string, void, unknown>;
      const newMessage = await MessageServices.create(
        conversationId,
        message,
        "User",
        "TEXT"
      );
      msgId = newMessage.id;
      const userInformation = await getMemories(userId, message);

      let filePath: string = "";
      if (file) {
        if (file.mimetype != "application/pdf") {
          res.write("Only pdf files are supported");
          res.end();
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          res.write("Files should be less than 20 MB");
          res.end();
          return;
        }
        filePath = path.join(__dirname, "../../", `${file.path}`);
      }
      streams = getAiResponseText(
        message,
        userInformation,
        messageWithValidType,
        filePath
      );

      let wholeResponse = "";

      for await (const chunk of streams) {
        wholeResponse += chunk;
        res.write(`${chunk}`);
      }
      if (file?.path)
        res.end(JSON.stringify({ status: "complete", url: file.path }));
      else res.end();
      await setMemories(userId, wholeResponse);
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
