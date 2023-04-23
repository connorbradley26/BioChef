import { z } from "zod";
import { useMealCardContext } from "./MealCardContext";
import { RouterInputs, RouterOutputs } from '@/lib/api';
 type CreateMeal = RouterInputs["meals"]["createMeal"];
 type GetMeal = RouterOutputs["meals"]["getMealsByDateRange"][number];

// TODO - update this to have actual details
const MealCardDetails = () => {
    const { getMeal, createMeal } = useMealCardContext();
    const meal = getMeal || createMeal;
    return (
        <div className="h-full">
           
                <div>
                <div className="divider">Nutrition</div>
                <div className="">
                    <div className="grid items-center grid-cols-2 " >
                        <span>Calories</span>
                        <div className="tooltip" data-tip={meal?.nutrition?.calories + "kcal"}>
                            <progress className=" progress" value={meal?.nutrition?.calories} max="2000"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2 ">
                        <span>Protein</span>
                        <div className="tooltip" data-tip={meal?.nutrition?.protein + "g"}>
                            <progress className=" progress" value={meal?.nutrition?.protein} max="73"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2">
                        <span>Fat</span>
                        <div className="tooltip" data-tip={meal?.nutrition?.fat + "g"}>
                            <progress className=" progress" value={meal?.nutrition?.fat} max="90"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2 ">
                        <span>Carbs</span>
                        <div className="tooltip" data-tip={meal?.nutrition?.carbs + "g"}>
                            <progress className=" progress" value={meal?.nutrition?.carbs} max="450"></progress>
                        </div>
                    </div>
                </div>
                </div>
           
        </div>
    );
};

export default MealCardDetails;
