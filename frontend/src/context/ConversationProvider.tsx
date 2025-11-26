import ConversationListContext from "@/context/Conversations";
import { type Conversation } from "@/types/types";
import axios from "@/utils/axios";
import { type ReactNode, useEffect, useState } from "react";

interface ConversationProviderProps {
  children: ReactNode;
}

const ConversationProvider = ({ children }: ConversationProviderProps) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get("/conversation/all");
      setConversations(res.data.data);
    };
    fetchConversations();
  }, []);

  const createConversation = async () => {
    const res = await axios.post("/conversation", {
      title: "New chat",
    });

    const { id, title, updatedAt } = res.data.data || {};
    const newConversation: Conversation = {
      id,
      title,
      updatedAt,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setSelectedChat(newConversation.id);
    return newConversation;
  };

  return (
    <ConversationListContext.Provider
      value={{
        conversations,
        createConversation,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ConversationListContext.Provider>
  );
};

export default ConversationProvider;
