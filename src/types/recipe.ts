export interface Ingredient {
  name: string;
  amount: string;
}
export interface Recipe {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  calories?: string;
  // Nutrition
  proteins?: string;
  fat?: string;
  carbs?: string; // Matching the mapper (carbs vs carbohydrate)
  // Details
  ingredients?: Ingredient[];
  instructions?: string[];
}
