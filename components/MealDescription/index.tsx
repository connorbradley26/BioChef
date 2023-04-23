import { mealPlans } from "@/types";
import MealIngredients from "./MealIngredients";
import MealRecipe from "./MealRecipe";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";

interface MealDescriptionProps {
    meal: GetRecipeByID;
}

export default function MealDescription({ meal }: MealDescriptionProps) {
    return (
        <div className="p-4 shadow-xl rounded-xl bg-base-100">
            <p className="text-lg font-bold">{meal.title}</p>
            <div className="">
                <MealIngredients ingredients={meal.extendedIngredients} />
                {/* Not sure why analyzedInstructions is an array, but its the data we get from the API. */}
                {meal.analyzedInstructions &&
                    meal.analyzedInstructions.length > 0 &&
                    meal.analyzedInstructions[0].steps && (
                        <MealRecipe
                            steps={meal.analyzedInstructions[0].steps}
                        />
                    )}
            </div>
        </div>
    );
}
