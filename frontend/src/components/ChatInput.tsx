import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Globe,
  Image as ImageIcon,
  MessageSquareText,
  Paperclip,
  Voicemail,
} from "lucide-react";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Textarea } from "./ui/textarea";

interface ChatInputProps {
  onSendMessage: (
    message: string,
    mode: "SUMMARIZE" | "GENERATE",
    file?: File
  ) => void;
  disabled?: boolean;
  setPdfUrl: Dispatch<SetStateAction<string>>;
}

const ChatInput = ({ onSendMessage, disabled, setPdfUrl }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>();
  const [mode, setMode] = useState<"SUMMARIZE" | "GENERATE">("SUMMARIZE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSendMessage(message, mode, file);
      setFile(undefined);
      setPdfUrl("");
      setMessage("");
    } else {
      if (message.trim() && !disabled) {
        onSendMessage(message, mode);
        setMessage("");
      }
    }
  };

  const handleFileSelect = async () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
      return;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setPdfUrl(URL.createObjectURL(selected));
    } else {
      setFile(undefined);
      setPdfUrl("");
    }
  };

  const handleWebSearch = () => {};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const modeButtonStyle = (selected: boolean) =>
    `flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors
     ${
       selected
         ? "bg-[#222] border border-[#633cff] text-[#c7bfff] shadow-inner"
         : "bg-transparent text-gray-400 hover:text-gray-100 border border-transparent"
     }`;

  return (
    <div className="sticky bottom-0 w-full border-t border-gray-700/50 bg-[#212121] pt-6 mt-4">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-end gap-2 mb-2 select-none">
          <button
            type="button"
            className={modeButtonStyle(mode === "SUMMARIZE")}
            aria-pressed={mode === "SUMMARIZE"}
            onClick={() => setMode("SUMMARIZE")}
            tabIndex={0}
            aria-label="Text generation mode"
          >
            <MessageSquareText className="w-4 h-4" />
            Text
          </button>
          <button
            type="button"
            className={modeButtonStyle(mode === "GENERATE")}
            aria-pressed={mode === "GENERATE"}
            onClick={() => setMode("GENERATE")}
            tabIndex={0}
            aria-label="Image generation mode"
          >
            <ImageIcon className="w-4 h-4" />
            Image
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative gap-2 rounded-2xl border shadow-lg bg-[#303030]"
        >
          <div className="flex flex-col relative gap-2 rounded-2xl border shadow-lg">
            {file && (
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-24 h-28 bg-[#303030] rounded-md border border-gray-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setFile(undefined);
                      setPdfUrl("");
                    }}
                    className="absolute top-1 right-1 z-10 bg-[#222] bg-opacity-80 text-gray-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-[#444] transition"
                    aria-label="Remove selected file"
                    tabIndex={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.47 6.47a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 11-1.06-1.06L8.94 10l-2.47-2.47a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="w-10 h-12 rounded-sm shadow-md flex items-center justify-center mb-2 relative bg-linear-to-br from-[#d32f2f] via-[#b71c1c] to-[#8e2424]">
                      <span className="font-bold text-xs text-white absolute bottom-1 left-0 right-0 text-center tracking-widest">
                        PDF
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-300 truncate px-1 text-center w-full">
                      {file.name}
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
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === "GENERATE"
                  ? "Describe the image you want to generate…"
                  : "Ask anything"
              }
              className="flex-1 min-h-[52px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-100 placeholder:text-gray-400 py-3 px-2"
              rows={1}
            />
            <div className="flex items-center gap-1 pl-3 pb-2 justify-between relative rounded-2xl">
              <div className="">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={disabled}
                />
                <Button
                  onClick={handleFileSelect}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-gray-200 hover:bg-transparent"
                  disabled={disabled || mode == "GENERATE"}
                >
                  <Paperclip className="h-4 w-4 mr-1.5" />
                  <span className="text-xs">Attach</span>
                </Button>
                <Button
                  onClick={handleWebSearch}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-400 hover:text-gray-200 hover:bg-transparent"
                  disabled={disabled}
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
