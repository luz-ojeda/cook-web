export type Recipe = {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    pictures: string[];
    videos: string[];
    preparationTime: number;
    cookingTime: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    vegetarian: boolean;
};