"use client";

import { MealPlan } from "@/lib/mealPlanTypes";
import { cn } from "@/lib/utils";

interface MealPlanListProps {
  mealPlans: MealPlan[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export default function MealPlanList({
  mealPlans,
  selectedPlanId,
  onSelectPlan,
}: MealPlanListProps) {
  if (mealPlans.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <p className="text-sm text-muted-foreground text-center">
          No meal plans available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Meal Plans</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {mealPlans.length} {mealPlans.length === 1 ? "plan" : "plans"} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {mealPlans.map((plan) => (
            <MealPlanListItem
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onClick={() => onSelectPlan(plan.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MealPlanListItem({
  plan,
  isSelected,
  onClick,
}: {
  plan: MealPlan;
  isSelected: boolean;
  onClick: () => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <button
      onClick={onClick}
        className={cn(
          "w-full text-left p-4 rounded-lg border transition-all",
          "hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20 dark:hover:border-green-800",
          isSelected
            ? "bg-green-800 text-white border-green-800 shadow-sm dark:bg-green-700"
            : "bg-background border-border text-foreground"
        )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{plan.name}</h3>
              {plan.isCurrent && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-green-800 text-white"
                  )}
                >
                  Current
                </span>
              )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
          </p>
        </div>
      </div>
      {plan.totalCalories && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {plan.totalCalories} kcal/day avg
          </span>
        </div>
      )}
    </button>
  );
}

