import Link from "next/link";
import { useMealCardContext } from "./MealCardContext";

// TODO - finish this
const MealCardActions = () => {
    const { getMeal, createMeal, link, buttonText, createAction, getAction } = useMealCardContext();

    const handleClick = () => {
        if (getMeal) {
            getAction && getAction(getMeal);
        }
        else if (createMeal) {
            createAction && createAction(createMeal);
        }
    }

    return (
        <div className="justify-end card-actions">
            {link ? (
                <Link href={link}>
                    <button className="btn-primary btn" onClick={handleClick}>{buttonText ? buttonText : "View"}</button>
                </Link>
            ) : (
                <button className="btn-primary btn" onClick={handleClick}>{buttonText ? buttonText : "View"}</button>
            )}
        </div>
    );
};

export default MealCardActions;
