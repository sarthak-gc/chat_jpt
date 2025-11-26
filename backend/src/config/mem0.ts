import MemoryClient from "mem0ai";
import env from "../utils/env";

export const client = new MemoryClient({ apiKey: env.MEM0_API_KEY });
