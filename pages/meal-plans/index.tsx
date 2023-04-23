import MealPlans from "@/components/meal-plans/index";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { api } from "@/lib/api";


const MealPlansPage: NextPageWithLayout = () => {

    return (
        <main className="">
            <MealPlans eatingTime="Breakfast"/>
            <MealPlans eatingTime="Lunch"/>
            <MealPlans eatingTime="Dinner"/>
        </main>
    )
}

MealPlansPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default MealPlansPage;