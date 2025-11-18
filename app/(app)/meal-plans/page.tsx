/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import SelectedMealPlan from "@/components/meal-plans/SelectedMealPlan";
import MealPlanList from "@/components/meal-plans/MealPlanList";
import { MealPlan } from "@/lib/mealPlanTypes";

// Mock data generator - used as the original local fallback
const generateMockMealPlans = (): MealPlan[] => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = [
    {
      breakfast: { name: "Oatmeal with Berries", calories: 350, protein: 12, carbs: 55, fat: 8 },
      lunch: { name: "Grilled Chicken Salad", calories: 450, protein: 35, carbs: 20, fat: 25 },
      dinner: { name: "Salmon with Vegetables", calories: 550, protein: 40, carbs: 30, fat: 28 },
    },
    {
      breakfast: { name: "Greek Yogurt Parfait", calories: 320, protein: 20, carbs: 40, fat: 10 },
      lunch: { name: "Quinoa Bowl", calories: 480, protein: 18, carbs: 65, fat: 15 },
      dinner: { name: "Turkey Meatballs", calories: 520, protein: 38, carbs: 35, fat: 22 },
    },
    {
      breakfast: { name: "Avocado Toast", calories: 380, protein: 15, carbs: 45, fat: 18 },
      lunch: { name: "Lentil Soup", calories: 420, protein: 22, carbs: 55, fat: 12 },
      dinner: { name: "Chicken Stir Fry", calories: 500, protein: 42, carbs: 40, fat: 20 },
    },
  ];

  const plans: MealPlan[] = [
    {
      id: "1",
      name: "Week of Jan 15, 2024",
      startDate: "2024-01-15",
      endDate: "2024-01-21",
      isCurrent: true,
      totalCalories: 2100,
      createdAt: "2024-01-14T10:00:00Z",
      days: days.map((day, idx) => ({
        day,
        ...meals[idx % meals.length],
        snacks: [
          { name: "Apple", calories: 80, protein: 0, carbs: 21, fat: 0 },
          { name: "Almonds", calories: 160, protein: 6, carbs: 6, fat: 14 },
        ],
      })),
    },
    {
      id: "2",
      name: "Week of Jan 8, 2024",
      startDate: "2024-01-08",
      endDate: "2024-01-14",
      isCurrent: false,
      totalCalories: 2000,
      createdAt: "2024-01-07T10:00:00Z",
      days: days.map((day, idx) => ({
        day,
        ...meals[(idx + 1) % meals.length],
        snacks: [{ name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 }],
      })),
    },
    {
      id: "3",
      name: "Week of Jan 1, 2024",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
      isCurrent: false,
      totalCalories: 1950,
      createdAt: "2023-12-31T10:00:00Z",
      days: days.map((day, idx) => ({
        day,
        ...meals[(idx + 2) % meals.length],
        snacks: [{ name: "Protein Bar", calories: 200, protein: 15, carbs: 20, fat: 8 }],
      })),
    },
  ];

  return plans;
};

export default function MealPlansPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load meal plans from localStorage, otherwise generate mock plans
    try {
      const stored = localStorage.getItem("mealPlans");
      if (stored) {
        const parsed = JSON.parse(stored) as MealPlan[];
        setMealPlans(parsed);
        const currentPlan = parsed.find((p) => p.isCurrent);
        setSelectedPlanId(currentPlan?.id || parsed[0]?.id || null);
      } else {
        const mockPlans = generateMockMealPlans();
        setMealPlans(mockPlans);
        const currentPlan = mockPlans.find((p) => p.isCurrent);
        setSelectedPlanId(currentPlan?.id || mockPlans[0]?.id || null);
        localStorage.setItem("mealPlans", JSON.stringify(mockPlans));
      }
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      const mockPlans = generateMockMealPlans();
      setMealPlans(mockPlans);
      const currentPlan = mockPlans.find((p) => p.isCurrent);
      setSelectedPlanId(currentPlan?.id || mockPlans[0]?.id || null);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectedPlan = mealPlans.find((p) => p.id === selectedPlanId) || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading meal plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Meal Plans</h1>
        <p className="text-muted-foreground">View and manage your weekly meal plans</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Selected Meal Plan - 2/3 width */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="h-full max-h-[calc(100vh-12rem)]">
            <SelectedMealPlan mealPlan={selectedPlan} />
          </div>
        </div>

        {/* Meal Plan List - 1/3 width */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="h-full max-h-[calc(100vh-12rem)]">
            <MealPlanList
              mealPlans={mealPlans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={setSelectedPlanId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
