import { mealPlans } from "@/types";
import { AnalyzedInstruction, Step } from "@/types/Spoonacular/GetRecipeByID";

interface MealRecipeProps {
    steps: Step[];
}

export default function MealRecipe({ steps }: MealRecipeProps) {

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold">Recipe</h3>
            <ul className="steps steps-vertical">
                {steps.map((step) => (
                    <li key={step.number} className="step">
                        {step.step}
                    </li>
                ))}
            </ul>
        </div>
    );

}