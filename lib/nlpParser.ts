import { ParsedCommand } from "./chatTypes";
import { BioData } from "./types";

/**
 * Simple NLP parser to extract commands and entities from user messages
 * In production, this would use a more sophisticated NLP service
 */
export function parseCommand(text: string): ParsedCommand {
  const lowerText = text.toLowerCase().trim();

  // Check for update intent
  if (
    lowerText.includes("update") ||
    lowerText.includes("change") ||
    lowerText.includes("set") ||
    lowerText.includes("modify") ||
    lowerText.includes("edit")
  ) {
    return parseUpdateCommand(text, lowerText);
  }

  // Check for query intent
  if (
    lowerText.includes("what") ||
    lowerText.includes("show") ||
    lowerText.includes("tell") ||
    lowerText.includes("my") ||
    lowerText.startsWith("?")
  ) {
    return parseQueryCommand(text, lowerText);
  }

  // Check for help
  if (lowerText.includes("help") || lowerText.includes("what can you")) {
    return {
      intent: "help",
      entity: "general",
      originalText: text,
    };
  }

  return {
    intent: "unknown",
    entity: "general",
    originalText: text,
  };
}

function parseUpdateCommand(text: string, lowerText: string): ParsedCommand {
  const fields: Record<string, any> = {};

  // Parse weight
  const weightMatch = lowerText.match(/(?:weight|weighs?)\s*(?:is|:)?\s*(\d+(?:\.\d+)?)\s*(?:kg|kilograms?|kilos?)?/);
  if (weightMatch) {
    fields.weight = parseFloat(weightMatch[1]);
  }

  // Parse height
  const heightMatch = lowerText.match(/(?:height|tall|cm|centimeters?)\s*(?:is|:)?\s*(\d+(?:\.\d+)?)\s*(?:cm|centimeters?)?/);
  if (heightMatch) {
    fields.height = parseFloat(heightMatch[1]);
  }

  // Parse age
  const ageMatch = lowerText.match(/(?:age|years? old)\s*(?:is|:)?\s*(\d+)/);
  if (ageMatch) {
    fields.age = parseInt(ageMatch[1]);
  }

  // Parse dietary restrictions
  if (
    lowerText.includes("allergy") ||
    lowerText.includes("allergic") ||
    lowerText.includes("dietary restriction") ||
    lowerText.includes("can't eat") ||
    lowerText.includes("cannot eat")
  ) {
    // Extract the restriction text
    const restrictionPatterns = [
      /(?:allergy|allergic|restriction|can't eat|cannot eat)[\s:]+(.+?)(?:\.|$|and|,)/i,
      /(?:i|my)\s+(?:am|have)\s+(?:allergic|allergy)\s+to\s+(.+?)(?:\.|$|and|,)/i,
    ];
    
    for (const pattern of restrictionPatterns) {
      const match = text.match(pattern);
      if (match) {
        fields.dietaryRestrictions = match[1].trim();
        break;
      }
    }
    
    if (!fields.dietaryRestrictions) {
      // Fallback: extract after keywords
      const afterKeyword = text.split(/(?:allergy|allergic|restriction|can't eat|cannot eat)[\s:]+/i)[1];
      if (afterKeyword) {
        fields.dietaryRestrictions = afterKeyword.split(/[.,]/)[0].trim();
      }
    }
  }

  // Parse budget
  const budgetMatch = lowerText.match(/(?:budget|spend|spending)\s*(?:is|:)?\s*\$?(\d+)/);
  if (budgetMatch) {
    fields.budgetConstraints = `$${budgetMatch[1]} per week`;
  }

  // Parse health goals
  if (
    lowerText.includes("goal") ||
    lowerText.includes("want to") ||
    lowerText.includes("trying to") ||
    lowerText.includes("aiming to")
  ) {
    const goalPatterns = [
      /(?:goal|want to|trying to|aiming to)[\s:]+(.+?)(?:\.|$)/i,
      /(?:i|my)\s+(?:goal|want|trying|aiming)\s+(?:is|to)\s+(.+?)(?:\.|$)/i,
    ];
    
    for (const pattern of goalPatterns) {
      const match = text.match(pattern);
      if (match) {
        fields.dietHealthGoals = match[1].trim();
        break;
      }
    }
  }

  // Determine entity
  let entity: ParsedCommand["entity"] = "biodata";
  if (lowerText.includes("meal plan") || lowerText.includes("mealplan")) {
    entity = "mealplan";
  } else if (lowerText.includes("recipe")) {
    entity = "recipe";
  } else if (lowerText.includes("profile")) {
    entity = "profile";
  }

  return {
    intent: "update",
    entity,
    fields: Object.keys(fields).length > 0 ? fields : undefined,
    originalText: text,
  };
}

function parseQueryCommand(text: string, lowerText: string): ParsedCommand {
  let entity: ParsedCommand["entity"] = "general";

  if (lowerText.includes("weight") || lowerText.includes("height") || lowerText.includes("bmi") || lowerText.includes("profile")) {
    entity = "biodata";
  } else if (lowerText.includes("meal plan") || lowerText.includes("mealplan")) {
    entity = "mealplan";
  } else if (lowerText.includes("recipe")) {
    entity = "recipe";
  }

  return {
    intent: "query",
    entity,
    originalText: text,
  };
}

/**
 * Apply parsed command to update BioData
 */
export function applyBioDataUpdate(
  currentData: BioData | null,
  fields: Record<string, any>
): Partial<BioData> {
  const updates: Partial<BioData> = {};

  if (fields.weight !== undefined) {
    updates.weight = fields.weight;
  }
  if (fields.height !== undefined) {
    updates.height = fields.height;
  }
  if (fields.age !== undefined) {
    updates.age = fields.age;
  }
  if (fields.dietaryRestrictions) {
    updates.dietaryRestrictions = fields.dietaryRestrictions;
  }
  if (fields.budgetConstraints) {
    updates.budgetConstraints = fields.budgetConstraints;
  }
  if (fields.dietHealthGoals) {
    updates.dietHealthGoals = fields.dietHealthGoals;
  }

  return updates;
}

