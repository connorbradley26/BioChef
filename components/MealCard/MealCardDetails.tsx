import { useMealCardContext } from "./MealCardContext";

// TODO - update this to have actual details
const MealCardDetails = () => {
    const { meal } = useMealCardContext();

    return (
        <>
            {meal ? (
                <p>{meal.createdAt.toDateString()}</p>
            ) : (
                <p>Meal not found</p>
            )}
        </>
    );
};

export default MealCardDetails;
