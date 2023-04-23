import MealPlanScroller from "@/components/MealPlanScroller";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { api } from "@/lib/api";

// TODO - get meal plans from API as getServerSideProps
const MealPlansPage: NextPageWithLayout = () => {

    return (
        <main className="mx-10 my-20">
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