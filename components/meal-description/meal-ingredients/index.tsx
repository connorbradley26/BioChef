import { mealPlans } from "@/types";

interface MealIngredientsProps {
    ingredients: mealPlans["ingredients"];
}

export default function MealIngredients({ ingredients }: MealIngredientsProps) {
    return (
        <div className="p-4 ">
            <h3 className="text-xl font-bold">Ingredients</h3>
            <ul className="text-lg">
                {ingredients.map((ingredient, index) => (
                    
                    <li key={index} className="flex">
                        <p className="mr-2">{ingredient.name}</p>
                        <p>{ingredient.quantity} - {ingredient.unit}</p>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}
