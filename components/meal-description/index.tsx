import { mealPlans } from "@/types";
import MealIngredients from "./meal-ingredients";
import MealRecipe from "./meal-recipe";

interface MealDescriptionProps {
    meal: mealPlans;
}

export default function MealDescription({ meal }: MealDescriptionProps) {
    return (
        <div className="p-4 shadow-xl rounded-xl bg-base-100">
            <p className="text-lg">{meal.description}</p>
            <div className="grid grid-cols-4">
                <div className="col-span-3">
                    <MealRecipe recipe={meal.instructions} />                
                </div>
                <MealIngredients ingredients={meal.ingredients} />
            </div>
        </div>
    );


}