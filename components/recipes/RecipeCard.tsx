"use client";

import { Recipe } from "@/lib/recipeTypes";
import { cn } from "@/lib/utils";
import { Heart, ExternalLink, Clock, Users } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
}

export default function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(recipe.id);
  };

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <a
      href={recipe.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all hover:border-primary/50 overflow-hidden"
    >
      {/* Image */}
      {recipe.imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors",
              recipe.isFavorite
                ? "bg-green-800 text-white"
                : "bg-black/30 text-white hover:bg-black/50"
            )}
            aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                recipe.isFavorite ? "fill-current" : "fill-none"
              )}
            />
          </button>
        </div>
      ) : (
        <div className="relative h-48 w-full bg-muted flex items-center justify-center">
          <div className="text-center p-4">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors",
              recipe.isFavorite
                ? "bg-green-800 text-white"
                : "bg-background/80 text-foreground hover:bg-background"
            )}
            aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                recipe.isFavorite ? "fill-current" : "fill-none"
              )}
            />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors line-clamp-2 flex-1">
            {recipe.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
        </div>

        {recipe.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground">
          {totalTime > 0 && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{totalTime} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
          {recipe.difficulty && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : recipe.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {recipe.difficulty}
            </span>
          )}
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {recipe.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Source */}
        {recipe.sourceName && (
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
            Source: {recipe.sourceName}
          </p>
        )}
      </div>
    </a>
  );
}

