import Link from "next/link";
import { useMealCardContext } from "./MealCardContext";

// TODO - finish this
const MealCardActions = () => {
    const { meal, link, buttonText, action } = useMealCardContext();

    const handleClick = () => {
        console.log("Handle click", meal, action)
        if (action && meal) {
            action(meal);
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
