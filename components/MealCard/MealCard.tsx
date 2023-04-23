import { Meal } from "@prisma/client";
import MealCardContext from "./MealCardContext";
import MealCardImage from "./MealCardImage";
import MealCardTitle from "./MealCardTitle";
import MealCardDetails from "./MealCardDetails";
import MealCardActions from "./MealCardActions";

interface MealCardProps {
    meal?: Meal;
    onMealClick: (meal: Meal) => void;
}

const MealCard = ({ meal, onMealClick }: MealCardProps) => {
    return (
        <MealCardContext.Provider value={{ meal }}>
            <div className="shadow-xl card w-96 bg-base-100">
                <MealCardImage />
                <div className="card-body">
                    <MealCardTitle />
                    <MealCardDetails />
                    <MealCardActions />
                </div>
            </div>
        </MealCardContext.Provider>
    );
};

export default MealCard;
