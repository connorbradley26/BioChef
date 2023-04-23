import { useMealCardContext } from "./MealCardContext";

// TODO - update this to have actual details
const MealCardDetails = () => {
    const { getMeal } = useMealCardContext();

    return (
        <div className="h-full">
            {getMeal ? (
                <div>
                <div className="divider">Nutrition</div>
                <div className="">
                    <div className="grid items-center grid-cols-2 " >
                        <span>Calories</span>
                        <div className="tooltip" data-tip={getMeal.mealNutritionalInformation?.calories + "kcal"}>
                            <progress className=" progress" value={getMeal.mealNutritionalInformation?.calories} max="2000"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2 ">
                        <span>Protein</span>
                        <div className="tooltip" data-tip={getMeal.mealNutritionalInformation?.protein + "g"}>
                            <progress className=" progress" value={getMeal.mealNutritionalInformation?.protein} max="73"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2">
                        <span>Fat</span>
                        <div className="tooltip" data-tip={getMeal.mealNutritionalInformation?.fat + "g"}>
                            <progress className=" progress" value={getMeal.mealNutritionalInformation?.fat} max="90"></progress>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-2 ">
                        <span>Carbs</span>
                        <div className="tooltip" data-tip={getMeal.mealNutritionalInformation?.carbs + "g"}>
                            <progress className=" progress" value={getMeal.mealNutritionalInformation?.carbs} max="450"></progress>
                        </div>
                    </div>
                </div>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default MealCardDetails;
