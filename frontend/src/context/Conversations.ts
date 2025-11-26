import { type Conversation } from "@/types/types";
import { createContext } from "react";

interface ConversationContextType {
  conversations: Conversation[];
  createConversation: () => Promise<Conversation>;
  selectedChat: string | null;
  setSelectedChat: (id: string | null) => void;
}

const ConversationListContext = createContext<ConversationContextType>({
  conversations: [],
  createConversation: async () => {
    return { id: "", title: "", updatedAt: new Date() };
  },
  selectedChat: null,
  setSelectedChat: () => {},
});

export default ConversationListContext;
