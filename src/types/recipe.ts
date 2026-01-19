export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
  ingredients?: Ingredient[];
  instructions?: string[];
}