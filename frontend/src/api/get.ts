import axios from "@/utils/axios";

export const getMessages = async (id: string) => {
  try {
    const res = await axios.get(`/conversation/${id}`);
    return res.data.data;
  } catch {
    return [];
  }
};
