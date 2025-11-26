import ConversationListContext from "@/context/Conversations";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const EmptyState = () => {
  const navigate = useNavigate();
  const { createConversation, setSelectedChat } = useContext(
    ConversationListContext
  );
  const handleNewChat = async () => {
    const newConversation = await createConversation();
    navigate(`/dashboard/${newConversation.id}`);
    setSelectedChat(newConversation.id);
  };
  return (
    <div className="flex-1 flex items-center justify-center px-4 flex-col">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-gray-100 mb-8">
            What are you working on?
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="h-9 px-4 bg-white text-black hover:bg-gray-100"
          onClick={handleNewChat}
        >
          Start Chatting
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
