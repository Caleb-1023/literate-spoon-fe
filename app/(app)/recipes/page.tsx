"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { Recipe } from "@/lib/recipeTypes";

// Mock data generator - replace with API call
const generateMockRecipes = (): Recipe[] => {
  return [
    {
      id: "1",
      name: "Grilled Salmon with Vegetables",
      description: "A healthy and delicious salmon dish with seasonal vegetables, perfect for a balanced meal.",
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
      sourceUrl: "https://example.com/recipes/grilled-salmon",
      sourceName: "Healthy Eats",
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: "Medium",
      tags: ["Salmon", "Healthy", "Dinner"],
      isFavorite: false,
    },
    {
      id: "2",
      name: "Quinoa Power Bowl",
      description: "Nutrient-packed quinoa bowl with fresh vegetables, avocado, and a tangy dressing.",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      sourceUrl: "https://example.com/recipes/quinoa-bowl",
      sourceName: "Veggie Delight",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      difficulty: "Easy",
      tags: ["Vegetarian", "Quinoa", "Lunch"],
      isFavorite: true,
    },
    {
      id: "3",
      name: "Chicken Stir Fry",
      description: "Quick and easy chicken stir fry with colorful vegetables and a savory sauce.",
      imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      sourceUrl: "https://example.com/recipes/chicken-stir-fry",
      sourceName: "Quick Meals",
      prepTime: 10,
      cookTime: 15,
      servings: 3,
      difficulty: "Easy",
      tags: ["Chicken", "Quick", "Dinner"],
      isFavorite: false,
    },
    {
      id: "4",
      name: "Mediterranean Salad",
      description: "Fresh Mediterranean salad with feta cheese, olives, and a lemon-herb dressing.",
      imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
      sourceUrl: "https://example.com/recipes/mediterranean-salad",
      sourceName: "Fresh & Light",
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      difficulty: "Easy",
      tags: ["Salad", "Mediterranean", "Lunch"],
      isFavorite: true,
    },
    {
      id: "5",
      name: "Beef Tacos",
      description: "Classic beef tacos with fresh toppings and homemade salsa.",
      imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c0b5e3a?w=400",
      sourceUrl: "https://example.com/recipes/beef-tacos",
      sourceName: "Taco Tuesday",
      prepTime: 20,
      cookTime: 25,
      servings: 6,
      difficulty: "Medium",
      tags: ["Beef", "Mexican", "Dinner"],
      isFavorite: false,
    },
    {
      id: "6",
      name: "Overnight Oats",
      description: "Creamy overnight oats with berries and nuts - perfect for busy mornings.",
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      sourceUrl: "https://example.com/recipes/overnight-oats",
      sourceName: "Breakfast Club",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      difficulty: "Easy",
      tags: ["Breakfast", "Oats", "Healthy"],
      isFavorite: true,
    },
    {
      id: "7",
      name: "Pasta Primavera",
      description: "Light and fresh pasta dish with spring vegetables and a light cream sauce.",
      imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      sourceUrl: "https://example.com/recipes/pasta-primavera",
      sourceName: "Italian Kitchen",
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: "Medium",
      tags: ["Pasta", "Vegetarian", "Dinner"],
      isFavorite: false,
    },
    {
      id: "8",
      name: "Greek Yogurt Parfait",
      description: "Layered parfait with Greek yogurt, fresh berries, and granola.",
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
      sourceUrl: "https://example.com/recipes/greek-yogurt-parfait",
      sourceName: "Healthy Eats",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      difficulty: "Easy",
      tags: ["Breakfast", "Yogurt", "Healthy"],
      isFavorite: false,
    },
  ];
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes - replace with actual API call
    const fetchRecipes = async () => {
      try {
        // Try to load from localStorage first
        const storedRecipes = localStorage.getItem("recipes");
        const storedFavorites = localStorage.getItem("recipeFavorites");

        if (storedRecipes) {
          const parsed = JSON.parse(storedRecipes) as Recipe[];
          setRecipes(parsed);
        } else {
          // Use mock data
          const mockRecipes = generateMockRecipes();
          setRecipes(mockRecipes);
          localStorage.setItem("recipes", JSON.stringify(mockRecipes));
        }

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        const mockRecipes = generateMockRecipes();
        setRecipes(mockRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleToggleFavorite = (recipeId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];

      // Update localStorage
      localStorage.setItem("recipeFavorites", JSON.stringify(newFavorites));

      // Update recipe favorite status
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        )
      );

      return newFavorites;
    });
  };

  // Sync favorites with recipes
  const recipesWithFavorites = recipes.map((recipe) => ({
    ...recipe,
    isFavorite: favorites.includes(recipe.id),
  }));

  const favoriteRecipes = recipesWithFavorites.filter((recipe) => recipe.isFavorite);
  const allRecipes = recipesWithFavorites;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Recipes</h1>
        <p className="text-muted-foreground">
          Discover and save your favorite recipe suggestions
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Recipes
            <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
              {allRecipes.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites
            <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
              {favoriteRecipes.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <RecipeGrid recipes={allRecipes} onToggleFavorite={handleToggleFavorite} />
        </TabsContent>

        <TabsContent value="favorites" className="mt-0">
          <RecipeGrid recipes={favoriteRecipes} onToggleFavorite={handleToggleFavorite} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
