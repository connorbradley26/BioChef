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
        <div className="w-full h-full ">
            {link ? (
                <Link href={link}>
                    <button className="w-full h-full btn-primary btn" onClick={handleClick}>{buttonText ? buttonText : "View"}</button>
                </Link>
            ) : (
                <button className="w-full h-full btn-primary btn" onClick={handleClick}>{buttonText ? buttonText : "View"}</button>
            )}
        </div>
    );
};

export default MealCardActions;
