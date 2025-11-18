export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actionType?: "update" | "query" | "confirmation";
  updatedFields?: string[];
}

export interface ParsedCommand {
  intent: "update" | "query" | "help" | "unknown";
  entity: "biodata" | "mealplan" | "recipe" | "profile" | "general";
  fields?: Record<string, any>;
  originalText: string;
}

