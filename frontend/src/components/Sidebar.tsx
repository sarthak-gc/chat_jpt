import { Button } from "@/components/ui/button";
import ConversationListContext from "@/context/Conversations";
import { cn } from "@/lib/utils";
import { MessageSquare, MoreVertical, Plus } from "lucide-react";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ className }: { className: string }) => {
  const { conversations, createConversation, selectedChat, setSelectedChat } =
    useContext(ConversationListContext);

  const navigate = useNavigate();

  const {
    todayChats,
    yesterdayChats,
    previous7DaysChats,
    previous30DaysChats,
  } = useMemo(() => {
    const now = new Date();

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const todayChats = conversations.filter((conv) => {
      const date = new Date(conv.updatedAt);
      return date >= today && date < now;
    });

    const yesterdayChats = conversations.filter((conv) => {
      const date = new Date(conv.updatedAt);
      return date >= yesterday && date < today;
    });

    const previous7DaysChats = conversations.filter((conv) => {
      const date = new Date(conv.updatedAt);
      return date >= sevenDaysAgo && date < yesterday;
    });

    const previous30DaysChats = conversations.filter((conv) => {
      const date = new Date(conv.updatedAt);
      return date >= thirtyDaysAgo && date < sevenDaysAgo;
    });

    return {
      todayChats,
      yesterdayChats,
      previous7DaysChats,
      previous30DaysChats,
    };
  }, [conversations]);

  const handleNewChat = async () => {
    const newConversation = await createConversation();
    navigate(`/dashboard/${newConversation.id}`);
    setSelectedChat(newConversation.id);
  };

  const handleChatClick = (id: string) => {
    navigate(`/dashboard/${id}`);
    setSelectedChat(id);
  };

  return (
    <div
      className={`${className}  h-screen flex flex-col bg-[#171717] text-gray-100 w-64 border-r border-gray-700/50`}
    >
      <div className="p-2">
        <Button
          onClick={handleNewChat}
          className="w-full justify-start gap-2 bg-transparent hover:bg-gray-700/50 text-white border border-gray-700/50"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {todayChats.length > 0 && (
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Today
            </div>
            <div className="space-y-1">
              {todayChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={cn(
                    "w-full px-3 py-2 text-sm rounded-md text-left hover:bg-gray-700/50 transition-colors flex items-center gap-2 group",
                    selectedChat === chat.id && "bg-gray-700/70"
                  )}
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate flex-1 text-gray-200">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {yesterdayChats.length > 0 && (
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Yesterday
            </div>
            <div className="space-y-1">
              {yesterdayChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={cn(
                    "w-full px-3 py-2 text-sm rounded-md text-left hover:bg-gray-700/50 transition-colors flex items-center gap-2 group",
                    selectedChat === chat.id && "bg-gray-700/70"
                  )}
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate flex-1 text-gray-200">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {previous7DaysChats.length > 0 && (
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Previous 7 Days
            </div>
            <div className="space-y-1">
              {previous7DaysChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={cn(
                    "w-full px-3 py-2 text-sm rounded-md text-left hover:bg-gray-700/50 transition-colors flex items-center gap-2 group",
                    selectedChat === chat.id && "bg-gray-700/70"
                  )}
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate flex-1 text-gray-200">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {previous30DaysChats.length > 0 && (
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Previous 30 Days
            </div>
            <div className="space-y-1">
              {previous30DaysChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={cn(
                    "w-full px-3 py-2 text-sm rounded-md text-left hover:bg-gray-700/50 transition-colors flex items-center gap-2 group",
                    selectedChat === chat.id && "bg-gray-700/70"
                  )}
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate flex-1 text-gray-200">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-gray-700/50">
        <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-white">U</span>
            </div>
            <span className="text-sm text-gray-200 truncate">User</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-transparent shrink-0"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
