"use client";

import { ChatMessage as ChatMessageType } from "@/lib/chatTypes";
import { cn } from "@/lib/utils";
import { User, Bot, CheckCircle2 } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start space-x-3 mb-4",
        isUser ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-green-800 text-white"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      <div
        className={cn(
          "flex-1 rounded-lg p-4 max-w-[80%]",
          isUser
            ? "bg-green-800 text-white"
            : "bg-muted text-foreground"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.updatedFields && message.updatedFields.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-3 h-3" />
              <span className="font-medium">
                Updated: {message.updatedFields.join(", ")}
              </span>
            </div>
          </div>
        )}
        <p className="text-xs opacity-70 mt-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

