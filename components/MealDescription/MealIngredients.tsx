import { mealPlans } from "@/types";
import { ExtendedIngredient } from "@/types/Spoonacular/GetRecipeByID";

interface MealIngredientsProps {
    ingredients: ExtendedIngredient[];
}

export default function MealIngredients({ ingredients }: MealIngredientsProps) {
    return (
        <div className="p-4 ">
            <h3 className="text-xl font-bold">Ingredients</h3>
            <ul className="text-lg">
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="flex-wrap px-4 py-2">Ingredient</th>
                            <th className="px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                {ingredients.map((ingredient, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border">
                            {ingredient.originalName}
                        </td>
                        <td className="px-4 py-2 border">
                            {ingredient.measures?.metric?.amount} {ingredient.measures?.metric?.unitShort}
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}
