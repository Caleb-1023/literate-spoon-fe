export interface Meal {
  name: string;
  description?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface DayMeals {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks?: Meal[];
}

export interface MealPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  days: DayMeals[];
  totalCalories?: number;
  createdAt: string;
}

