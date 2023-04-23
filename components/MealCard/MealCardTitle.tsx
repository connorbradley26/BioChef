import { useMealCardContext } from "./MealCardContext";


const MealCardTitle = () => {

    const { meal } = useMealCardContext();

    return (
        <h2 className="card-title"> {meal ? meal.name : "Meal not found"} </h2>
    )
};

export default MealCardTitle;