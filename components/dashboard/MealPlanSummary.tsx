"use client";

import { MealPlan } from "@/lib/mealPlanTypes";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface MealPlanSummaryProps {
  mealPlan: MealPlan | null;
}

export default function MealPlanSummary({ mealPlan }: MealPlanSummaryProps) {
  if (!mealPlan) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Current Meal Plan
            </h3>
          </div>
          <Link
            href="/meal-plans"
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            View All →
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          No active meal plan. Create one to get started!
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const today = new Date();
  const startDate = new Date(mealPlan.startDate);
  const endDate = new Date(mealPlan.endDate);
  const isActive = today >= startDate && today <= endDate;

  // Get today's meals
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Convert Sunday=0 to Monday=0
  const todayMeals = mealPlan.days[dayIndex] || mealPlan.days[0];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Current Meal Plan
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDate(mealPlan.startDate)} - {formatDate(mealPlan.endDate)}
            </p>
          </div>
        </div>
        <Link
          href="/meal-plans"
          className="text-xs text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-base font-semibold text-foreground mb-3">{mealPlan.name}</h4>
          {mealPlan.totalCalories && (
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-muted-foreground">Daily Calories:</span>
              <span className="font-semibold text-foreground">{mealPlan.totalCalories} kcal</span>
            </div>
          )}
        </div>

        {/* Today's Meals Preview */}
        {isActive && todayMeals && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Today's Meals
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Breakfast:</span>
                <span className="font-medium text-foreground">{todayMeals.breakfast.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lunch:</span>
                <span className="font-medium text-foreground">{todayMeals.lunch.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dinner:</span>
                <span className="font-medium text-foreground">{todayMeals.dinner.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

