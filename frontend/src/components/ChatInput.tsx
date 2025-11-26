import { Button } from "@/components/ui/button";
import { ArrowUp, Globe, Paperclip, Voicemail } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 w-full border-t border-gray-700/50 bg-[#212121] pt-6 mt-4">
      <div className="max-w-3xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="relative   gap-2 rounded-2xl border shadow-lg bg-[#303030]"
        >
          <div className="flex flex-col  relative gap-2 rounded-2xl border shadow-lg">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              className="flex-1 min-h-[52px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-100 placeholder:text-gray-400 py-3 px-2"
              rows={1}
            />
            <div className="flex items-center gap-1 pl-3 pb-2 justify-between relative rounded-2xl">
              <div className="">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-gray-200 hover:bg-transparent"
                >
                  <Paperclip className="h-4 w-4 mr-1.5" />
                  <span className="text-xs">Attach</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-gray-200 hover:bg-transparent"
                >
                  <Globe className="h-4 w-4 mr-1.5" />
                  <span className="text-xs">Search</span>
                </Button>
              </div>

              <div className="flex items-center gap-1 pr-2 pb-2">
                {message.trim() ? (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={disabled}
                    className="h-8 w-8 p-0  bg-white rounded-full text-black disabled:opacity-50"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-400 hover:text-gray-200 hover:bg-transparent"
                  >
                    <Voicemail className="h-4 w-4 mr-1.5" />
                    <span className="text-xs">Voice</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>

        <p className="text-xs text-center text-gray-400 mt-3">
          ChatJPT can make mistakes. Check important info.
        </p>
        <p className="text-xs text-center text-gray-500 mt-2">
          By messaging ChatJPT, an AI chatbot, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-400">
            Terms
          </a>{" "}
          and have read our{" "}
          <a href="#" className="underline hover:text-gray-400">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
