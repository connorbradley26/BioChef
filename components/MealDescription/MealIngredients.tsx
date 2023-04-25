import { ExtendedIngredient } from "@/types/Spoonacular/GetRecipeByID";

interface MealIngredientsProps {
    ingredients: ExtendedIngredient[];
}

export default function MealIngredients({ ingredients }: MealIngredientsProps) {
    return (
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
                            {ingredient.name}
                        </td>
                        <td className="px-4 py-2 border">
                            {ingredient.amount} {ingredient.unit}
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
    );
}
