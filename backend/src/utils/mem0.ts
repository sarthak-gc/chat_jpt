import { Message } from "mem0ai";
import { client } from "../config/mem0";

export const getMemories = async (userId: string, prompt: string) => {
  try {
    await setMemories(userId, prompt);
    const filters = {
      OR: [{ user_id: userId }],
    };

    const results = await client.search(prompt, {
      api_version: "v2",
      filters: filters,
    });

    const information = results.map((result) => {
      return {
        memory: result.memory,
        metadata: result.metadata,
        category: result.categories,
      };
    });
    return JSON.stringify(information);
  } catch {
    return "";
  }
};

export const setMemories = async (user_id: string, prompt: string) => {
  const message: Message = {
    role: "user",
    content: prompt,
  };
  await client.add([message], { user_id });
};
