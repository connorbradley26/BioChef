import { useMealCardContext } from "./MealCardContext";


const MealCardTitle = () => {

    const { createMeal, getMeal } = useMealCardContext();

    return (
        <h2 className="card-title"> {createMeal ? createMeal.title : getMeal ? getMeal.name : null} </h2>
    )
};

export default MealCardTitle;