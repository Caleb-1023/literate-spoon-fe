"use client";

import { BioData } from "@/lib/types";
import { MealPlan } from "@/lib/mealPlanTypes";
import SummaryCard from "./SummaryCard";
import { User, DollarSign, Calendar, Heart } from "lucide-react";
import Link from "next/link";

interface QuickStatsProps {
  bioData: BioData | null;
  mealPlan: MealPlan | null;
  favoriteRecipesCount?: number;
}

export default function QuickStats({
  bioData,
  mealPlan,
  favoriteRecipesCount = 0,
}: QuickStatsProps) {
  const calculateBMI = (weight: number | undefined, height: number | undefined) => {
    if (!weight || !height || height === 0) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const bmi = calculateBMI(bioData?.weight, bioData?.height);
  const bmiCategory = bmi
    ? parseFloat(bmi) < 18.5
      ? "Underweight"
      : parseFloat(bmi) < 25
      ? "Normal"
      : parseFloat(bmi) < 30
      ? "Overweight"
      : "Obese"
    : null;

  // Extract budget number if possible
  const budgetText = bioData?.budgetConstraints || "";
  const budgetMatch = budgetText.match(/\$?(\d+)/);
  const budgetAmount = budgetMatch ? `$${budgetMatch[1]}` : "Not set";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="BMI"
        value={
          bmi ? (
            <span>
              {bmi} <span className="text-base text-muted-foreground">({bmiCategory})</span>
            </span>
          ) : (
            "Not calculated"
          )
        }
        icon={<User className="w-5 h-5" />}
        description={bioData?.weight && bioData?.height ? `${bioData.weight}kg / ${bioData.height}cm` : "Add weight & height"}
        link="/profile"
      />

      <SummaryCard
        title="Weekly Budget"
        value={budgetAmount}
        icon={<DollarSign className="w-5 h-5" />}
        description="For meals and groceries"
        link="/profile"
      />

      <SummaryCard
        title="Active Meal Plan"
        value={mealPlan ? "Active" : "None"}
        icon={<Calendar className="w-5 h-5" />}
        description={mealPlan ? mealPlan.name : "Create a meal plan"}
        link="/meal-plans"
        linkText="View"
      />

      <SummaryCard
        title="Favorite Recipes"
        value={favoriteRecipesCount.toString()}
        icon={<Heart className="w-5 h-5" />}
        description="Saved recipes"
        link="/recipes"
        linkText="View"
      />
    </div>
  );
}

