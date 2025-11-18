"use client";

import { useState, useEffect } from "react";
import { BioData } from "@/lib/types";
import { MealPlan } from "@/lib/mealPlanTypes";
import QuickStats from "@/components/dashboard/QuickStats";
import MealPlanSummary from "@/components/dashboard/MealPlanSummary";
import DietaryRestrictionsCard from "@/components/dashboard/DietaryRestrictionsCard";
import HealthGoalsCard from "@/components/dashboard/HealthGoalsCard";
import Link from "next/link";
import { ArrowRight, ChefHat, Calendar, User } from "lucide-react";

export default function DashboardPage() {
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [favoriteRecipesCount, setFavoriteRecipesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = () => {
      try {
        // Load BioData
        const storedBioData = localStorage.getItem("biodata");
        if (storedBioData) {
          setBioData(JSON.parse(storedBioData) as BioData);
        }

        // Load current meal plan
        const storedMealPlans = localStorage.getItem("mealPlans");
        if (storedMealPlans) {
          const plans = JSON.parse(storedMealPlans) as MealPlan[];
          const currentPlan = plans.find((p) => p.isCurrent) || plans[0] || null;
          setMealPlan(currentPlan);
        }

        // Load favorite recipes count
        const storedFavorites = localStorage.getItem("recipeFavorites");
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites) as string[];
          setFavoriteRecipesCount(favorites.length);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your health and nutrition journey
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats
        bioData={bioData}
        mealPlan={mealPlan}
        favoriteRecipesCount={favoriteRecipesCount}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Meal Plan */}
        <MealPlanSummary mealPlan={mealPlan} />

        {/* Dietary Restrictions & Budget */}
        <DietaryRestrictionsCard bioData={bioData} />
      </div>

      {/* Health Goals */}
      <HealthGoalsCard bioData={bioData} />

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-green-800 dark:text-green-600" />
              <span className="font-medium text-foreground">Update BioData</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-green-800 dark:group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/meal-plans"
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-800 dark:text-green-600" />
              <span className="font-medium text-foreground">View Meal Plans</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-green-800 dark:group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/recipes"
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <ChefHat className="w-5 h-5 text-green-800 dark:text-green-600" />
              <span className="font-medium text-foreground">Browse Recipes</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-green-800 dark:group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
