"use client";

import { useState, useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/chatTypes";
import { BioData } from "@/lib/types";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ChatInput from "@/components/chatbot/ChatInput";
import { parseCommand, applyBioDataUpdate } from "@/lib/nlpParser";
import { Bot } from "lucide-react";

const WELCOME_MESSAGE = `Hello! I'm your nutrition assistant. I can help you:

• Update your profile information (weight, height, age, dietary restrictions, budget, health goals)
• Answer questions about your data
• Help manage your meal plans and recipes

Try saying:
- "Update my weight to 75 kg"
- "I'm allergic to peanuts"
- "My budget is $100 per week"
- "What's my current BMI?"
- "Change my health goal to weight loss"

How can I help you today?`;

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bioData, setBioData] = useState<BioData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load current BioData
    const stored = localStorage.getItem("biodata");
    if (stored) {
      try {
        setBioData(JSON.parse(stored) as BioData);
      } catch (error) {
        console.error("Error loading BioData:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (userMessage: string) => {
    // Add user message
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    // Process the message
    setTimeout(() => {
      const response = processMessage(userMessage);
      setMessages((prev) => [...prev, response]);
      setIsProcessing(false);
    }, 500); // Simulate processing time
  };

  const processMessage = (userMessage: string): ChatMessageType => {
    const command = parseCommand(userMessage);
    let response: ChatMessageType;

    switch (command.intent) {
      case "update":
        response = handleUpdateCommand(command);
        break;
      case "query":
        response = handleQueryCommand(command, bioData);
        break;
      case "help":
        response = {
          id: Date.now().toString(),
          role: "assistant",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        };
        break;
      default:
        response = {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm not sure I understand. Could you rephrase that? I can help you update your profile information or answer questions about your data.",
          timestamp: new Date(),
        };
    }

    return response;
  };

  const handleUpdateCommand = (command: any): ChatMessageType => {
    if (command.entity === "biodata" && command.fields) {
      const updates = applyBioDataUpdate(bioData, command.fields);
      const updatedFields = Object.keys(updates);

      if (updatedFields.length === 0) {
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: "I couldn't extract any information to update from your message. Please try being more specific, for example: 'Update my weight to 75 kg' or 'I'm allergic to peanuts'.",
          timestamp: new Date(),
        };
      }

      // Update BioData
      const updatedBioData: BioData = {
        ...(bioData || {
          firstName: "",
          gender: "prefer not to say" as const,
          zipCode: "",
          weight: 0,
          height: 0,
          age: 0,
          dietaryRestrictions: "",
          budgetConstraints: "",
          dietHealthGoals: "",
        }),
        ...updates,
      };

      // Save to localStorage
      localStorage.setItem("biodata", JSON.stringify(updatedBioData));
      setBioData(updatedBioData);

      // Generate response
      const fieldNames = updatedFields.map((field) => {
        const names: Record<string, string> = {
          weight: "weight",
          height: "height",
          age: "age",
          dietaryRestrictions: "dietary restrictions",
          budgetConstraints: "budget",
          dietHealthGoals: "health goals",
        };
        return names[field] || field;
      });

      const values = updatedFields.map((field) => {
        const value = updates[field as keyof typeof updates];
        if (typeof value === "number") {
          return field === "weight" ? `${value} kg` : field === "height" ? `${value} cm` : `${value} years`;
        }
        return value;
      });

      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `✅ Updated successfully!\n\n${fieldNames.map((name, i) => `• ${name}: ${values[i]}`).join("\n")}\n\nYour profile has been updated. You can view the changes in your Profile section.`,
        timestamp: new Date(),
        actionType: "update",
        updatedFields: fieldNames,
      };
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "I can help you update your BioData information. Try saying things like 'Update my weight to 75 kg' or 'I'm allergic to peanuts'.",
      timestamp: new Date(),
    };
  };

  const handleQueryCommand = (command: any, currentBioData: BioData | null): ChatMessageType => {
    if (command.entity === "biodata" && currentBioData) {
      const responses: string[] = [];

      if (command.originalText.toLowerCase().includes("weight")) {
        responses.push(`Your weight: ${currentBioData.weight ? `${currentBioData.weight} kg` : "Not set"}`);
      }
      if (command.originalText.toLowerCase().includes("height")) {
        responses.push(`Your height: ${currentBioData.height ? `${currentBioData.height} cm` : "Not set"}`);
      }
      if (command.originalText.toLowerCase().includes("bmi")) {
        if (currentBioData.weight && currentBioData.height) {
          const heightInMeters = currentBioData.height / 100;
          const bmi = currentBioData.weight / (heightInMeters * heightInMeters);
          const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
          responses.push(`Your BMI: ${bmi.toFixed(1)} (${category})`);
        } else {
          responses.push("BMI cannot be calculated. Please set your weight and height first.");
        }
      }
      if (command.originalText.toLowerCase().includes("age")) {
        responses.push(`Your age: ${currentBioData.age ? `${currentBioData.age} years` : "Not set"}`);
      }
      if (command.originalText.toLowerCase().includes("allergy") || command.originalText.toLowerCase().includes("restriction")) {
        responses.push(`Dietary restrictions: ${currentBioData.dietaryRestrictions || "None specified"}`);
      }
      if (command.originalText.toLowerCase().includes("budget")) {
        responses.push(`Budget: ${currentBioData.budgetConstraints || "Not set"}`);
      }
      if (command.originalText.toLowerCase().includes("goal")) {
        responses.push(`Health goals: ${currentBioData.dietHealthGoals || "Not set"}`);
      }

      if (responses.length === 0) {
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `Here's your current profile information:\n\n• Weight: ${currentBioData.weight ? `${currentBioData.weight} kg` : "Not set"}\n• Height: ${currentBioData.height ? `${currentBioData.height} cm` : "Not set"}\n• Age: ${currentBioData.age ? `${currentBioData.age} years` : "Not set"}\n• Dietary Restrictions: ${currentBioData.dietaryRestrictions || "None"}\n• Budget: ${currentBioData.budgetConstraints || "Not set"}\n• Health Goals: ${currentBioData.dietHealthGoals || "Not set"}`,
          timestamp: new Date(),
        };
      }

      return {
        id: Date.now().toString(),
        role: "assistant",
        content: responses.join("\n"),
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "I don't have that information yet. Please update your profile first, or ask me about your weight, height, BMI, dietary restrictions, budget, or health goals.",
      timestamp: new Date(),
    };
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Bot className="w-6 h-6 text-green-800 dark:text-green-600" />
          <h1 className="text-3xl font-bold text-foreground">Chatbot</h1>
        </div>
        <p className="text-muted-foreground">
          Ask me anything or update your profile using natural language
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} disabled={isProcessing} />
      </div>
    </div>
  );
}
