import { useMealCardContext } from "./MealCardContext";

// TODO - update this to have actual details
const MealCardDetails = () => {
    const { meal } = useMealCardContext();

    return (
        <>
            {meal ? (
                <>
                    <p>{Math.round(meal.mealNutritionalInformation?.calories || 0)} kcal</p>
                    <p>{Math.round(meal.mealNutritionalInformation?.protein || 0)}g protein</p>
                    <p>{Math.round(meal.mealNutritionalInformation?.fat || 0)}g fat</p>
                    <p>{Math.round(meal.mealNutritionalInformation?.carbs || 0)}g carbs</p>
                </>
            ) : (
                <p>Meal not found</p>
            )}
        </>
    );
};

export default MealCardDetails;
