import { Request, Response } from "express";
import { ConversationServices } from "../services/conversation.services";
import {
  conversationNotFound,
  internalError,
  success,
  unAuthorized,
} from "../utils/return/returns";

export const ConversationControllers = {
  createConversation: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const title = req.body.title || {};

      const conversation = await ConversationServices.create(
        userId,
        title || "New Chat"
      );
      if (!conversation) {
        internalError(res);
        return;
      }
      success(res, "New conversation created", {
        id: conversation.id,
        updatedAt: conversation.updatedAt,
        title: conversation.title,
      });
    } catch {
      internalError(res);
    }
  },

  getConversationTitles: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.p || 0);
      const userId = req.userId;

      const titles = await ConversationServices.getTitles(userId, page);

      if (titles.length == 0) {
        success(res, "No titles found", []);
        return;
      }
      success(res, "Titles found", titles);
    } catch {
      internalError(res);
    }
  },

  getConversationMessages: async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.id;
      let page = Number(req.query.p || 0);
      if (isNaN(page) || page < 0) {
        page = 0;
      }

      const conversation = await ConversationServices.get(conversationId);
      if (!conversation) {
        conversationNotFound(res);
        return;
      }

      if (conversation.userId !== req.userId) {
        unAuthorized(res);
        return;
      }

      const messages = await ConversationServices.getMessages(
        conversationId,
        page
      );
      if (messages.length == 0) {
        success(res, "Messages retrived", []);
        return;
      }

      success(res, "Messages retrived", messages);
    } catch {
      internalError(res);
    }
  },
};
