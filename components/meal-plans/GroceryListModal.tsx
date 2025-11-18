"use client";

import { MealPlan } from "@/lib/mealPlanTypes";
import { GroceryList, GroceryItem } from "@/lib/groceryTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingCart, DollarSign } from "lucide-react";
import { useMemo } from "react";

interface GroceryListModalProps {
  mealPlan: MealPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock function to generate grocery list from meal plan
// In a real app, this would call an API or use a recipe database
function generateGroceryList(mealPlan: MealPlan | null): GroceryList {
  if (!mealPlan) {
    return { items: [], totalCost: 0 };
  }

  // Extract ingredients from meal names (simplified - in real app, use recipe database)
  const ingredientMap = new Map<string, { quantity: number; unit: string; category: string }>();

  mealPlan.days.forEach((day) => {
    const meals = [day.breakfast, day.lunch, day.dinner, ...(day.snacks || [])];
    
    meals.forEach((meal) => {
      // Simple ingredient extraction (mock data)
      // In production, this would come from a recipe database
      const ingredients = extractIngredients(meal.name);
      
      ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();
        const existing = ingredientMap.get(key);
        
        if (existing) {
          existing.quantity += ingredient.quantity;
        } else {
          ingredientMap.set(key, {
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
          });
        }
      });
    });
  });

  // Convert to grocery items with estimated prices
  const items: GroceryItem[] = Array.from(ingredientMap.entries()).map(([name, data]) => {
    const estimatedPrice = estimatePrice(name, data.quantity, data.unit);
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      quantity: data.quantity.toFixed(1),
      unit: data.unit,
      category: data.category,
      estimatedPrice,
    };
  });

  // Sort by category
  items.sort((a, b) => a.category.localeCompare(b.category));

  const totalCost = items.reduce((sum, item) => sum + item.estimatedPrice, 0);

  return { items, totalCost };
}

// Mock function to extract ingredients from meal name
function extractIngredients(mealName: string): Array<{ name: string; quantity: number; unit: string; category: string }> {
  const name = mealName.toLowerCase();
  const ingredients: Array<{ name: string; quantity: number; unit: string; category: string }> = [];

  // Simple pattern matching (in production, use recipe database)
  if (name.includes("salmon")) {
    ingredients.push({ name: "Salmon", quantity: 0.5, unit: "lb", category: "Protein" });
  }
  if (name.includes("chicken")) {
    ingredients.push({ name: "Chicken Breast", quantity: 1, unit: "lb", category: "Protein" });
  }
  if (name.includes("turkey")) {
    ingredients.push({ name: "Ground Turkey", quantity: 1, unit: "lb", category: "Protein" });
  }
  if (name.includes("beef")) {
    ingredients.push({ name: "Ground Beef", quantity: 1, unit: "lb", category: "Protein" });
  }
  if (name.includes("quinoa")) {
    ingredients.push({ name: "Quinoa", quantity: 1, unit: "cup", category: "Grains" });
  }
  if (name.includes("rice") || name.includes("pasta")) {
    ingredients.push({ name: "Rice/Pasta", quantity: 2, unit: "cup", category: "Grains" });
  }
  if (name.includes("oatmeal") || name.includes("oats")) {
    ingredients.push({ name: "Oats", quantity: 2, unit: "cup", category: "Grains" });
  }
  if (name.includes("vegetable") || name.includes("salad")) {
    ingredients.push({ name: "Mixed Vegetables", quantity: 2, unit: "lb", category: "Vegetables" });
  }
  if (name.includes("berry") || name.includes("berries")) {
    ingredients.push({ name: "Berries", quantity: 1, unit: "pint", category: "Fruits" });
  }
  if (name.includes("yogurt")) {
    ingredients.push({ name: "Greek Yogurt", quantity: 1, unit: "container", category: "Dairy" });
  }
  if (name.includes("avocado")) {
    ingredients.push({ name: "Avocado", quantity: 3, unit: "piece", category: "Fruits" });
  }
  if (name.includes("feta") || name.includes("cheese")) {
    ingredients.push({ name: "Cheese", quantity: 0.5, unit: "lb", category: "Dairy" });
  }
  if (name.includes("olive")) {
    ingredients.push({ name: "Olive Oil", quantity: 1, unit: "bottle", category: "Pantry" });
  }
  if (name.includes("almond") || name.includes("nut")) {
    ingredients.push({ name: "Nuts", quantity: 0.5, unit: "lb", category: "Pantry" });
  }

  // Add common staples
  ingredients.push({ name: "Eggs", quantity: 1, unit: "dozen", category: "Protein" });
  ingredients.push({ name: "Bread", quantity: 1, unit: "loaf", category: "Grains" });
  ingredients.push({ name: "Milk", quantity: 1, unit: "gallon", category: "Dairy" });

  return ingredients;
}

// Mock function to estimate price
function estimatePrice(name: string, quantity: number, unit: string): number {
  const pricePerUnit: Record<string, number> = {
    "salmon": 12,
    "chicken breast": 6,
    "ground turkey": 5,
    "ground beef": 7,
    "quinoa": 4,
    "rice/pasta": 2,
    "oats": 3,
    "mixed vegetables": 3,
    "berries": 5,
    "greek yogurt": 4,
    "avocado": 2,
    "cheese": 6,
    "olive oil": 8,
    "nuts": 10,
    "eggs": 4,
    "bread": 3,
    "milk": 4,
  };

  const key = name.toLowerCase();
  const basePrice = pricePerUnit[key] || 3; // Default $3 if not found
  
  // Simple multiplier based on quantity
  return basePrice * Math.max(1, quantity);
}

const categoryColors: Record<string, string> = {
  Protein: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Vegetables: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Fruits: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Grains: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Dairy: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Pantry: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function GroceryListModal({
  mealPlan,
  open,
  onOpenChange,
}: GroceryListModalProps) {
  const groceryList = useMemo(() => generateGroceryList(mealPlan), [mealPlan]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-green-800 dark:text-green-600" />
            <span>Grocery List</span>
          </DialogTitle>
          <DialogDescription>
            Shopping list for {mealPlan?.name || "this meal plan"}
          </DialogDescription>
        </DialogHeader>

        {groceryList.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No items in grocery list</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Group by category */}
            {Object.entries(
              groceryList.items.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, GroceryItem[]>)
            ).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  {category}
                </h3>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}
                        >
                          {category}
                        </span>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${item.estimatedPrice.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total Cost */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-800 dark:text-green-600" />
                  <span className="text-lg font-semibold text-foreground">Total Estimated Cost</span>
                </div>
                <span className="text-2xl font-bold text-green-800 dark:text-green-600">
                  ${groceryList.totalCost.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Prices are estimates and may vary by location
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

