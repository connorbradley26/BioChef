import { GetMealInstructionsOutput } from "@/server/api/zodTypes/getMealInstructions";
import LoadingSpinner from "../LoadingSpinner";

interface MealRecipeProps {
    instructions: GetMealInstructionsOutput;
}

const MealRecipe = ({instructions}: MealRecipeProps)  => {
    if (!instructions) return (<LoadingSpinner />);

    return (
        <div className="flex-grow mt-4">
            <h3 className="text-xl font-bold">Recipe</h3>
            <ul className="steps steps-vertical">
                {instructions[0]?.steps.map((step) => <li key={step.number}>{step.step}</li>)}
            </ul>
        </div>
    );
}

export default MealRecipe;