export interface Recipe {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceName?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  tags?: string[];
  isFavorite?: boolean;
}

