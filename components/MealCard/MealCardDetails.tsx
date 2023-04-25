import { useMealCardContext } from "./MealCardContext";

const MealCardDetails = () => {
    const { getMeal, createMeal } = useMealCardContext();
    const meal = getMeal || createMeal;

    if (!meal) {
        return null;
    }

    // Todo - get nutrition from users data
    const formattedNutrition = () => {
        if (!meal?.nutrition) {
            return null;
        }
        const nutrition = meal.nutrition;
        const formattedNutrition = [
            {
                name: "Calories",
                value: nutrition.calories,
                max: 2000,
                unit: "kcal",
            },
            {
                name: "Protein",
                value: nutrition.protein,
                max: 73,
                unit: "g",
            },
            {
                name: "Fat",
                value: nutrition.fat,
                max: 65,
                unit: "g",
            },
            {
                name: "Carbs",
                value: nutrition.carbs,
                max: 300,
                unit: "g",
            },
        ]
        return formattedNutrition;
    }
            
    return (
        <div className="h-full mb-8">
            <div className="divider">Nutrition</div>
            <div className="">
                {formattedNutrition()?.map((nutrient) => {
                    return (
                        <div key={nutrient.name} className="grid items-center grid-cols-2 ">
                            <span>{nutrient.name}</span>
                            <div className="tooltip" data-tip={nutrient.value + nutrient.unit}>
                                <progress className=" progress" value={nutrient.value} max={nutrient.max}></progress>
                            </div>
                        </div>
                    );
                })}                
            </div>
        </div>
    );
};

export default MealCardDetails;
