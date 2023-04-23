import MealPlans from "@/components/meal-plans/index";
import { mealPlans } from "@/dummydata/MealPlans";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { api } from "@/lib/api";


const MealPlansPage: NextPageWithLayout = () => {
    // const { data: meals } = api.meals.getMealSuggestionsByNutrition.useQuery({
    //     maxCalories: 500,
    //     maxProtein: 50,
    //     maxCarbs: 50,
    //     maxFat: 50,
    //     minCalories: 0,
    //     minProtein: 0,
    //     minCarbs: 0,
    //     minFat: 0,
    // }, { refetchOnWindowFocus: false });

    // console.log(meals);

    return (
        <main className="">
            {/* <pre>{JSON.stringify(meals, null, 2)}</pre> */}
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