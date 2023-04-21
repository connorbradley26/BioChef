import MealDescription from "@/components/meal-description";
import MealImage from "@/components/meal-image";
import MealNutritionInfo from "@/components/meal-nutrition-info";
import { mealPlans } from "@/dummydata/MealPlans"
async function getMealFromId(mealId: number) {
    const meals = await mealPlans;
    return meals.find(meal => meal.id === mealId);
}

type IndividalMealProps = {
    params: {mealId: string}
}

export default async function Page({params} : IndividalMealProps) {
    const meal = await getMealFromId(parseInt(params.mealId));

    if (!meal) {
        return <div>Meal not found</div>
    }

    return (
        <main className="grid grid-cols-1 gap-6 m-10 md:grid-cols-3">
            <div className="relative rounded shadow-xl md:col-span-2">
                <MealImage  src={meal!.image} alt={meal!.name} />
            </div>
            {/* <pre className="md:col-span-2 bg-base-100 card">{JSON.stringify(meal, null, 2)}</pre> */}
            <MealNutritionInfo nutritionInfo={meal!.nutrition}/>
            <div className=" md:col-span-3">
                <MealDescription meal={meal}/>
            </div>
        </main>
    )
    
}