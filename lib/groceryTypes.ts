export interface GroceryItem {
  name: string;
  quantity: string;
  unit: string;
  category: string;
  estimatedPrice: number;
}

export interface GroceryList {
  items: GroceryItem[];
  totalCost: number;
}

