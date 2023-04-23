
import MealCardContext from "./MealCardContext";
import MealCardImage from "./MealCardImage";
import MealCardTitle from "./MealCardTitle";
import MealCardDetails from "./MealCardDetails";
import MealCardActions from "./MealCardActions";
import { RouterInputs, RouterOutputs } from "@/lib/api";
type CreateMeal = RouterInputs["meals"]["createMeal"];
type GetMeal = RouterOutputs["meals"]["getMealsByDateRange"][number];

interface MealCardProps {
    getMeal?: GetMeal;
    createMeal?: CreateMeal;
    link?: string;
    buttonText: string;
    createAction?: (meal: CreateMeal) => void;
    getAction?: (meal: GetMeal) => void;
}

const MealCard = ({ getMeal, createMeal, link, buttonText, createAction, getAction }: MealCardProps) => {
    return (
        <MealCardContext.Provider value={{ getMeal, createMeal, link, buttonText, createAction, getAction}}>
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
