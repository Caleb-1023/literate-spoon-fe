"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BioData } from "@/lib/types";

interface StepThreeProps {
  register: UseFormRegister<BioData>;
  errors: FieldErrors<BioData>;
}

export default function StepThree({ register, errors }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Interpreted Data</h2>
        <p className="text-muted-foreground text-sm">Please provide detailed information about your diet, preferences, and activity level. This data will be processed by an LLM.</p>
      </div>

      <div className="space-y-4">
        {/* Diet Health Goals */}
        <div>
          <label htmlFor="dietHealthGoals" className="block text-sm font-medium text-foreground mb-2">
            Diet and Health Goals <span className="text-destructive">*</span>
          </label>
          <textarea
            id="dietHealthGoals"
            rows={5}
            {...register("dietHealthGoals")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Describe your diet and health goals (e.g., weight loss, muscle gain, managing diabetes, etc.)"
          />
          {errors.dietHealthGoals && (
            <p className="mt-1 text-sm text-destructive">{errors.dietHealthGoals.message}</p>
          )}
        </div>

        {/* Food Preferences */}
        {/* <div>
          <label htmlFor="foodPreferences" className="block text-sm font-medium text-foreground mb-2">
            Food Preferences <span className="text-destructive">*</span>
          </label>
          <textarea
            id="foodPreferences"
            rows={5}
            {...register("foodPreferences")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Describe your food preferences, favorite cuisines, and any specific foods you enjoy or dislike"
          />
          {errors.foodPreferences && (
            <p className="mt-1 text-sm text-destructive">{errors.foodPreferences.message}</p>
          )}
        </div> */}

        {/* Physical Activity Level */}
        {/* <div>
          <label htmlFor="physicalActivityLevel" className="block text-sm font-medium text-foreground mb-2">
            Physical Activity Level <span className="text-destructive">*</span>
          </label>
          <textarea
            id="physicalActivityLevel"
            rows={5}
            {...register("physicalActivityLevel")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Describe your physical activity level, exercise routine, and fitness goals"
          />
          {errors.physicalActivityLevel && (
            <p className="mt-1 text-sm text-destructive">{errors.physicalActivityLevel.message}</p>
          )}
        </div> */}

        {/* Recipe and Nutrient Feedback */}
        {/* <div>
          <label htmlFor="recipeAndNutrientFeedback" className="block text-sm font-medium text-foreground mb-2">
            Recipe and Nutrient Feedback <span className="text-destructive">*</span>
          </label>
          <textarea
            id="recipeAndNutrientFeedback"
            rows={5}
            {...register("recipeAndNutrientFeedback")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Provide any feedback about recipes, nutrient requirements, or specific nutritional needs"
          />
          {errors.recipeAndNutrientFeedback && (
            <p className="mt-1 text-sm text-destructive">{errors.recipeAndNutrientFeedback.message}</p>
          )}
        </div> */}
      </div>
    </div>
  );
}

