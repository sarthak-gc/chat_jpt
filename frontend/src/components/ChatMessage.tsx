import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Sparkles } from "lucide-react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  // id: string;
  role: "User" | "AI";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "User";

  const markdownComponents: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const code = String(children).replace(/\n$/, "");
      const isInline = !className?.includes("language-");

      if (!isInline && language) {
        return (
          <div className="my-4 rounded-lg overflow-hidden bg-[#282c34] border border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-700">
              <span className="text-xs text-gray-400 font-mono uppercase">
                {language}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-transparent"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                <Copy className="h-3 w-3 mr-1.5" />
                Copy code
              </Button>
            </div>
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "#282c34",
                  fontSize: "0.875rem",
                }}
                wrapLongLines={false}
                PreTag="div"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }

      return (
        <code
          className={cn(
            className,
            "bg-[#282c34] text-[#abb2bf] px-1.5 py-0.5 rounded text-sm font-mono"
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    p({ children, className }) {
      return (
        <p
          className={cn(
            "leading-relaxed whitespace-pre-wrap mb-4 last:mb-0",
            className
          )}
        >
          {children}
        </p>
      );
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 w-full py-6">
      <div
        className={cn(
          "flex gap-4 items-start",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {!isUser && (
          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#19c37d] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
        )}

        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-4 py-3",
            "bg-[#303030] text-gray-100"
          )}
        >
          <div
            className={cn(
              "prose max-w-none",
              isUser ? "prose-neutral" : "prose-invert"
            )}
          >
            <ReactMarkdown components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {isUser && (
          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#5436da] text-white">
            U
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
