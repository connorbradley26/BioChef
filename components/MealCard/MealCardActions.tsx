import { useMealCardContext } from "./MealCardContext";

// TODO - finish this
const MealCardActions = () => {

    const { meal } = useMealCardContext();

    return (
        <div className="justify-end card-actions">
            <button className="btn btn-primary">View</button>
        </div>
    )
};

export default MealCardActions;