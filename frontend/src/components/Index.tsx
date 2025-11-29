import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import axios from "@/utils/axios";
import { BACKEND_URL } from "@/utils/constants";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

interface Message {
  id: string;
  role: "User" | "AI";
  content: string;
  filePath?: string;
  fileAttached?: boolean;
  originalName?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await axios.get(`/conversation/${id}`);
        setMessages(res.data.data);
      } catch {
        navigate("/dashboard");
      }
    };
    if (id) {
      fetchConversation();
    }
  }, [id, navigate]);
  const handleSendMessage = async (
    content: string,
    mode: "SUMMARIZE" | "GENERATE",
    file?: File
  ) => {
    if (!file) {
      setPdfUrl("");
    }
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "User",
      content,
      fileAttached: pdfUrl ? true : false,
      filePath: pdfUrl,
      originalName: file ? file.name : "",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let response: Response;

      if (file) {
        const formData = new FormData();
        formData.append("message", content);
        formData.append("file", file);

        response = await fetch(`${BACKEND_URL}/message/${id}/chat`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      } else {
        response = await fetch(`${BACKEND_URL}/message/${id}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: content, mode }),
          credentials: "include",
        });
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const aiMessageId = (Date.now() + 1).toString();

      if (mode == "SUMMARIZE") {
        const aiMessage: Message = {
          id: aiMessageId,
          role: "AI",
          content: "",
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
      setIsLoading(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      const isJson = (str: string) => {
        try {
          JSON.parse(str);
          return true;
        } catch {
          return false;
        }
      };
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);

        let jsonResponse: {
          url: string;
          status: string;
          type: "TXT" | "IMG";
          message: Message | null;
        } = {
          url: "",
          status: "",
          type: "TXT",
          message: null,
        };
        if (isJson(chunk)) {
          jsonResponse = JSON.parse(chunk);
          if (jsonResponse.type == "IMG") {
            if (jsonResponse.message) {
              setMessages((prev) => [...prev, jsonResponse.message as Message]);
            }
          } else {
            if (jsonResponse.url) {
              setPdfUrl(jsonResponse.url);
            }
          }
        } else {
          console.log("HERE");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error streaming response:", error);
      setIsLoading(false);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "AI",
        content: `Sorry, I encountered an error. Please make sure your backend is running on ${BACKEND_URL}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex">
      <div
        className={`flex ${
          pdfUrl ? "w-7/10" : "w-full"
        } flex-col h-screen bg-[#212121]`}
      >
        <ChatHeader />

        <div className="flex-1 overflow-y-auto">
          {!id ? (
            <div className="w-full h-7/10 items-center justify-center flex">
              <EmptyState />
            </div>
          ) : (
            <div className="w-full">
              {messages.map((message) => (
                <ChatMessage
                  setPdfUrl={setPdfUrl}
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  fileAttached={message.fileAttached}
                  filePath={message.filePath}
                  originalName={message.originalName}
                />
              ))}
              {isLoading && (
                <div className="w-full py-6">
                  <div className="max-w-5xl mx-auto px-4">
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#19c37d] text-white">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-[#303030]">
                        <div className="flex gap-1 pt-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {id && (
          <div className="w-full">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              setPdfUrl={setPdfUrl}
            />
          </div>
        )}
      </div>
      {pdfUrl && (
        <div className="w-3/10">
          <embed
            src={
              pdfUrl.startsWith("blob:http://")
                ? pdfUrl
                : `http://localhost:4002/${pdfUrl}`
            }
            type="application/pdf"
            className="w-full h-screen"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
