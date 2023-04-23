import MealPlanScroller from "@/components/MealPlanScroller";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { api } from "@/lib/api";


const MealPlansPage: NextPageWithLayout = () => {

    return (
        <main className="">
            <MealPlanScroller eatingTime="Breakfast"/>
            <MealPlanScroller eatingTime="Lunch"/>
            <MealPlanScroller eatingTime="Dinner"/>
        </main>
    )
}

MealPlansPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default MealPlansPage;