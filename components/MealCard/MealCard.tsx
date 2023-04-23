
import MealCardContext from "./MealCardContext";
import MealCardImage from "./MealCardImage";
import MealCardTitle from "./MealCardTitle";
import MealCardDetails from "./MealCardDetails";
import MealCardActions from "./MealCardActions";
import { useSession } from "next-auth/react";
import { RouterInputs, RouterOutputs } from "@/lib/api";
type CreateMeal = RouterInputs["meals"]["createMeal"];
type GetMeal = RouterOutputs["meals"]["getMealsByDateRange"][number];

interface MealCardProps {
    meal?: GetMeal;
    link?: string;
    buttonText: string;
    action?: (meal: CreateMeal) => void;
}

const MealCard = ({ meal, link, buttonText, action }: MealCardProps) => {
    return (
        <MealCardContext.Provider value={{ meal, link, buttonText, action}}>
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
