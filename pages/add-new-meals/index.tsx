import MealDescription from "@/components/meal-description";
import MealImage from "@/components/meal-image";
import MealNutritionInfo from "@/components/meal-nutrition-info";
import Meal from "@/components/meal-plans/meal-card";
import { api } from "@/lib/api";
import { NextPageWithLayout } from "@/pages/_app";
import RootLayout from "@/pages/layout";
import { spoonacularMeal } from "@/types";


const IndividualMeal: NextPageWithLayout = () => {

    const meals = api.meals.getMealSuggestionsByNutrition.useQuery({ maxCalories: 500, maxProtein: 50, maxCarbs: 50, maxFat: 50, minCalories: 0, minProtein: 0, minCarbs: 0, minFat: 0 }, { refetchOnWindowFocus: false });

    return (
        <main className="grid grid-cols-1 gap-6 m-10 md:grid-cols-3">
            { meals.data?.map((meal: spoonacularMeal) => (
                <Meal key={meal.id} meal={meal} day="Monday"/>
            ))}
        </main>
    )
    
}

IndividualMeal.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>
}

export default IndividualMeal;