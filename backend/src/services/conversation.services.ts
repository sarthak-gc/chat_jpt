import prisma from "../utils/prisma";
export const ConversationServices = {
  create: async (userId: string, title: string) => {
    return prisma.conversation.create({
      data: {
        userId,
        title,
      },
    });
  },

  updateTitle: async (id: string, title: string) => {
    return prisma.conversation.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
  },
  get: async (id: string) => {
    return prisma.conversation.findUnique({
      where: {
        id,
      },
    });
  },
  getTitles: async (userId: string, page: number) => {
    const take = 14;
    return prisma.conversation.findMany({
      take,
      skip: page * take,
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  getMessages: async (id: string, page: number) => {
    const take = 20;
    const messages = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        messages: {
          select: {
            content: true,
            role: true,
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: page * take,
          take,
        },
      },
    });
    return messages ? messages.messages.reverse() : [];
  },
  getMessagesForAI: async (id: string, page: number) => {
    const take = 10;
    const messages = await prisma.conversation.findUnique({
      where: {
        id,
      },
      select: {
        messages: {
          select: {
            content: true,
            role: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: page * take,
          take,
        },
      },
    });
    if (!messages) {
      return [];
    }

    return messages.messages;
  },
};
