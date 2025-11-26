import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import env from "./env";

declare global {
  var prisma: PrismaClient;
}

const connectionString = env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

export const prisma = globalThis.prisma || new PrismaClient({ adapter });

export default prisma;
