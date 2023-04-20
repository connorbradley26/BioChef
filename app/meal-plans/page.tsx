import MealPlans from "@/components/MealPlans";
import { mealPlans } from "@/dummydata/MealPlans";


export default async function Page() {

    return (
        <main className="">
            <MealPlans mealPlans={mealPlans} eatingTime="Breakfast"/>
            <MealPlans mealPlans={mealPlans} eatingTime="Lunch"/>
            <MealPlans mealPlans={mealPlans} eatingTime="Dinner"/>
        </main>
    )
}

