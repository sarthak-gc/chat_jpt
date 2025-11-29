import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Sparkles } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  role: "User" | "AI";
  content: string;
  fileAttached?: boolean;
  originalName?: string;
  filePath?: string;
  setPdfUrl: Dispatch<SetStateAction<string>>;
}

const ChatMessage = ({
  role,
  content,
  fileAttached,
  originalName,
  filePath,
  setPdfUrl,
}: ChatMessageProps) => {
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
            {fileAttached && (
              <div
                onClick={() => {
                  if (filePath) setPdfUrl(filePath);
                }}
                className="flex items-center gap-2 px-2 py-2"
              >
                <div className="w-24 h-28 bg-[#303030] rounded-md border border-gray-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="w-10 h-12 rounded-sm shadow-md flex items-center justify-center mb-2 relative bg-linear-to-br from-[#d32f2f] via-[#b71c1c] to-[#8e2424]">
                      <span className="font-bold text-xs text-white absolute bottom-1 left-0 right-0 text-center tracking-widest">
                        PDF
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-300 truncate px-1 text-center w-full">
                      {originalName}
                    </span>
                  </div>
                  <div className="absolute top-1.5 left-1.5 right-1.5 bottom-8 pointer-events-none opacity-25">
                    <div className="w-full h-2 bg-gray-700/40 rounded-sm my-0.5" />
                    <div className="w-5/6 h-2 bg-gray-700/20 rounded-sm my-0.5 mx-auto" />
                    <div className="w-full h-2 bg-gray-700/25 rounded-sm my-0.5" />
                    <div className="w-2/3 h-2 bg-gray-700/30 rounded-sm my-0.5 mx-auto" />
                  </div>
                </div>
              </div>
            )}
            <ReactMarkdown components={markdownComponents}>
              {content}
            </ReactMarkdown>
            {filePath?.startsWith("https://") && (
              <iframe src={filePath} height={400} width={400}></iframe>
            )}
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
