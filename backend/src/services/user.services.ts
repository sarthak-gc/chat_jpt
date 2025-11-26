import prisma from "../utils/prisma";
export const UserServices = {
  create: async (username: string) => {
    return await prisma.user.create({
      data: {
        username,
      },
    });
  },

  findByUsername: async (username: string) => {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  },
  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  createGoogleUser: async (
    username: string,
    email: string,
    googleId: string
  ) => {
    return await prisma.user.create({
      data: {
        username,
        email,
        googleId,
      },
    });
  },
};
