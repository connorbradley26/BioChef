import MealPlans from "@/components/meal-plans/index";
import { mealPlans } from "@/dummydata/MealPlans";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";


const MealPlansPage: NextPageWithLayout = () => {

    return (
        <main className="">
            <MealPlans mealPlans={mealPlans} eatingTime="Breakfast"/>
            <MealPlans mealPlans={mealPlans} eatingTime="Lunch"/>
            <MealPlans mealPlans={mealPlans} eatingTime="Dinner"/>
        </main>
    )
}

MealPlansPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default MealPlansPage;