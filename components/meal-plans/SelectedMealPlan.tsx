"use client";

import { useState } from "react";
import { MealPlan, DayMeals, Meal } from "@/lib/mealPlanTypes";
import { cn } from "@/lib/utils";
import GroceryListModal from "./GroceryListModal";
import { ShoppingCart } from "lucide-react";

interface SelectedMealPlanProps {
  mealPlan: MealPlan | null;
}

export default function SelectedMealPlan({ mealPlan }: SelectedMealPlanProps) {
  const [groceryListOpen, setGroceryListOpen] = useState(false);

  if (!mealPlan) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-sm h-full flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-muted-foreground mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Meal Plan Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a meal plan from the list to view details
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-2xl font-bold text-foreground">{mealPlan.name}</h2>
              {mealPlan.isCurrent && (
                <span className="px-2 py-1 text-xs font-medium bg-green-800 text-white rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(mealPlan.startDate)} - {formatDate(mealPlan.endDate)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {mealPlan.totalCalories && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Total Calories:</span>
                <span className="font-semibold text-foreground">{mealPlan.totalCalories} kcal</span>
              </div>
            </div>
          )}
          {/* <button
            onClick={() => setGroceryListOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Grocery List</span>
          </button> */}
        </div>
      </div>

      {/* Grocery List Modal */}
      <GroceryListModal
        mealPlan={mealPlan}
        open={groceryListOpen}
        onOpenChange={setGroceryListOpen}
      />

      {/* Weekly Meal Plan */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {mealPlan.days.map((dayMeals, index) => (
            <DayMealCard key={index} dayMeals={dayMeals} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DayMealCard({ dayMeals }: { dayMeals: DayMeals }) {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
        {dayMeals.day}
      </h3>
      <div className="space-y-4">
        <MealItem meal={dayMeals.breakfast} mealType="Breakfast" />
        <MealItem meal={dayMeals.lunch} mealType="Lunch" />
        <MealItem meal={dayMeals.dinner} mealType="Dinner" />
        {dayMeals.snacks && dayMeals.snacks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Snacks</h4>
            <div className="space-y-2">
              {dayMeals.snacks.map((snack, idx) => (
                <MealItem key={idx} meal={snack} mealType="" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MealItem({ meal, mealType }: { meal: Meal; mealType: string }) {
  return (
    <div className="bg-background rounded-lg p-4 border border-border">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          {mealType && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
              {mealType}
            </span>
          )}
          <h4 className="text-base font-semibold text-foreground">{meal.name}</h4>
          {meal.description && (
            <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
          )}
        </div>
      </div>
      {meal.calories && (
        <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-muted-foreground">Calories:</span>
            <span className="font-medium text-foreground">{meal.calories} kcal</span>
          </div>
          {meal.protein && (
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">Protein:</span>
              <span className="font-medium text-foreground">{meal.protein}g</span>
            </div>
          )}
          {meal.carbs && (
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">Carbs:</span>
              <span className="font-medium text-foreground">{meal.carbs}g</span>
            </div>
          )}
          {meal.fat && (
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">Fat:</span>
              <span className="font-medium text-foreground">{meal.fat}g</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

