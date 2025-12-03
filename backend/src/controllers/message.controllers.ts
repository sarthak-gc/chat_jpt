import { ModelMessage } from "ai";
import { Request, Response } from "express";
import path from "path";
import { generateImage } from "../config/freepik";
import { ConversationServices } from "../services/conversation.services";
import { MessageServices } from "../services/message.services";
import { getAiResponseFile, getAiResponseForText } from "../utils/ai";
import { getMemories, setMemories } from "../utils/mem0";
import prisma from "../utils/prisma";
import { conversationNotFound } from "../utils/return/returns";
export interface ModelMessageForGemini {
  role: "user" | "model";
  parts: [{ text: string }];
}

type MessageType = "SUMMARIZE" | "GENERATE";

export const MessageControllers = {
  liveChat: async (req: Request, res: Response) => {
    const userId = req.userId;
    const conversationId = req.params.conversationId;

    let messageType: MessageType = req.body?.mode;
    if (!messageType) {
      messageType = "SUMMARIZE";
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let message = "";
    let msgId = "";

    message = req.body.message || {};
    if (messageType == "GENERATE") {
      const url = await generateImage(message);

      const userMessage = await MessageServices.create(
        conversationId,
        message,
        "User",
        "TXT"
      );
      msgId = userMessage.id;
      const newImageMessage = await MessageServices.create(
        conversationId,
        "Here's your image",
        "AI",
        "IMG",
        url
      );

      res.end(
        JSON.stringify({
          status: "complete",
          type: "IMG",
          message: {
            id: newImageMessage.id,
            role: "AI",
            content: "Here's your image",
            filePath: url,
          },
        })
      );
      return;
    }

    const file = req.file;

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

      let streams: AsyncGenerator<string, void, unknown>;
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

      const newMessage = await MessageServices.create(
        conversationId,
        message,
        "User",
        filePath ? "PDF" : "TXT",
        file?.path,
        file?.originalname
      );

      msgId = newMessage.id;
      if (filePath) {
        const messageWithValidType: ModelMessage[] = aiMessages.map((msg) => {
          return {
            role: msg.role == "AI" ? "assistant" : "user",
            content: msg.content,
          };
        });

        streams = getAiResponseFile(
          message,
          userInformation,
          messageWithValidType,
          filePath
        );
      } else {
        const messageWithValidType: ModelMessageForGemini[] = aiMessages.map(
          (msg) => {
            return {
              role: msg.role == "AI" ? "model" : "user",
              parts: [{ text: msg.content }],
            };
          }
        );

        const oauthToken = req.cookies.oauth_token;
        streams = getAiResponseForText(
          message,
          userInformation,
          messageWithValidType,
          oauthToken
        );
      }

      let wholeResponse = "";

      for await (const chunk of streams) {
        wholeResponse += chunk;
        res.write(`${chunk}`);
      }
      if (file?.path)
        res.end(
          JSON.stringify({ type: "TXT", status: "complete", url: file.path })
        );
      else res.end();
      if (wholeResponse) await setMemories(userId, wholeResponse);
      await MessageServices.create(conversationId, wholeResponse, "AI", "TXT");
    } catch (err) {
      console.log(err);
      if (msgId) {
        await prisma.message.delete({
          where: {
            id: msgId,
          },
        });
      }
      res.write("data: [ERROR]\n\n");
      res.end();
    }
  },
};
