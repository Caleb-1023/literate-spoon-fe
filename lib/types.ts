import { z } from "zod";

// Step 1 Schema
export const stepOneSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  // Add email & password for registration during the biodata flow
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female", "non-binary", "prefer not to say"], {
    message: "Please select a gender option",
  }),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters").max(10, "Zip code must be less than 10 characters"),
});

// Step 2 Schema
export const stepTwoSchema = z.object({
  weight: z.number().min(1, "Weight must be greater than 0").max(1000, "Weight must be less than 1000"),
  height: z.number().min(1, "Height must be greater than 0").max(300, "Height must be less than 300"),
  age: z.number().min(1, "Age must be greater than 0").max(150, "Age must be less than 150"),
  dietaryRestrictions: z.string().min(1, "Dietary restrictions are required").max(500, "Dietary restrictions must be less than 500 characters"),
  budgetConstraints: z.number().min(0, "Budget constraints cannot be negative").max(10000, "Budget constraints must be less than 10000"),
});

// Step 3 Schema
export const stepThreeSchema = z.object({
  dietHealthGoals: z.string().min(1, "Diet and health goals are required").max(1000, "Diet and health goals must be less than 1000 characters"),
//   foodPreferences: z.string().min(1, "Food preferences are required").max(1000, "Food preferences must be less than 1000 characters"),
//   physicalActivityLevel: z.string().min(1, "Physical activity level is required").max(1000, "Physical activity level must be less than 1000 characters"),
//   recipeAndNutrientFeedback: z.string().min(1, "Recipe and nutrient feedback is required").max(1000, "Recipe and nutrient feedback must be less than 1000 characters"),
});

// Combined Schema
export const bioDataSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema);

// TypeScript Types
export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type BioData = z.infer<typeof bioDataSchema>;

