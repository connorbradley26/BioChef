import { mealPlans } from "@/types";

interface MealRecipeProps {
    recipe: mealPlans["instructions"];
}

export default function MealRecipe({ recipe }: MealRecipeProps) {

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold">Recipe</h3>
            <ol className="text-lg">
                {recipe.map((step) => (
                    <li key={step.id} className="flex">
                        <p className="mr-2">{step.step}</p>
                    </li>
                ))}
            </ol>
        </div>
    );

}