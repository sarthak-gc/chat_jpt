import { MessageType, Role } from "../generated/prisma/enums";
import prisma from "../utils/prisma";
export const MessageServices = {
  create: async (
    conversationId: string,
    content: string,
    role: Role,
    type: MessageType
  ) => {
    return await prisma.message.create({
      data: {
        conversationId,
        content,
        role,
        type,
      },
    });
  },
};
