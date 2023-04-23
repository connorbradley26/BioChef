import { useMealCardContext } from "./MealCardContext";

// TODO - update this to have actual details
const MealCardDetails = () => {
    const { getMeal } = useMealCardContext();

    return (
        <>
            {getMeal ? (
                <>
                    <p>{Math.round(getMeal.mealNutritionalInformation?.calories || 0)} kcal</p>
                    <p>{Math.round(getMeal.mealNutritionalInformation?.protein || 0)}g protein</p>
                    <p>{Math.round(getMeal.mealNutritionalInformation?.fat || 0)}g fat</p>
                    <p>{Math.round(getMeal.mealNutritionalInformation?.carbs || 0)}g carbs</p>
                </>
            ) : (
                <p>Meal not found</p>
            )}
        </>
    );
};

export default MealCardDetails;
