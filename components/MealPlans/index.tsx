
import Image from "next/image";
import Meal from "./Meal";
import type { mealPlans as MealPlanType } from "@/types";


type MealPlanProps = {
    mealPlans: MealPlanType[];
     //TODO type this
    eatingTime: string;
}

export default  function MealPlans({mealPlans, eatingTime} : MealPlanProps) {

    // TODO: Get meal plans from database

    return (
        <div className="mx-auto ">
            <h1 className="mx-10 mt-20 mb-10 text-xl ">{eatingTime}</h1>
            <div className=" carousel rounded-box">

                {mealPlans.map((mealPlan) => (
                    <Meal meal={mealPlan} key={mealPlan.id} />
                ))}
            </div>

        </div>

     
    )

}