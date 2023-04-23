import MealCard from "@/components/MealCard/MealCard";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";
import { useRouter } from "next/router";
import { RouterInputs, api } from "@/lib/api";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { NextPageWithLayout } from "@/pages/_app";
import RootLayout from "@/pages/layout";
type CreateMeal = RouterInputs["meals"]["createMeal"];


const Results: NextPageWithLayout = () => {
    const router = useRouter();
    const { type, day } = router.query as { type: "Breakfast" | "Lunch" | "Dinner"; day: string };
    const session = useSession();
    const createMealMutation = api.meals.createMeal.useMutation();

    if (!session?.data?.user?.id) {
        return (
            <div>
                <h1>Not logged in</h1>
            </div>
        )
    }

    let meals = { results: []} 
    if (typeof window !== "undefined") {
       meals = localStorage.getItem("MealSuggestions") ? JSON.parse(localStorage.getItem("MealSuggestions") as string) : null;
    }

    const convertSteps = (recipe: GetRecipeByID): string[] => {
        let steps: string[] = [];
        if (recipe.analyzedInstructions && recipe.analyzedInstructions[0]) {
            steps = recipe.analyzedInstructions[0].steps.map((step) => step.step || "")
        }

        return steps;   
    }

    const convertIngredients = (recipe: GetRecipeByID): CreateMeal["ingredients"] => {
        let ingredients: CreateMeal["ingredients"] = [];
        if (recipe.nutrition?.ingredients) {
            ingredients = recipe.nutrition.ingredients.map((ingredient) => {
                return {
                    name: ingredient.name || "" ,
                    amount: ingredient.amount || 0,
                    unit: ingredient.unit || "",
                }
            })
        }
        return ingredients;
    }

    const convertNutrition = (recipe: GetRecipeByID): CreateMeal["nutrition"] => {
        let nutrition: CreateMeal["nutrition"] = {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
        }
        if (recipe.nutrition?.nutrients) {
            nutrition = {
                calories: Math.round(recipe.nutrition.nutrients.find((nutrient) => nutrient.name === "Calories")?.amount || 0),
                protein: Math.round(recipe.nutrition.nutrients.find((nutrient) => nutrient.name === "Protein")?.amount || 0),
                fat: Math.round(recipe.nutrition.nutrients.find((nutrient) => nutrient.name === "Fat")?.amount || 0),
                carbs: Math.round(recipe.nutrition.nutrients.find((nutrient) => nutrient.name === "Carbohydrates")?.amount || 0),
            }
        }

        return nutrition;
    }

    const createNewMeal = (meal: CreateMeal) => {
        createMealMutation.mutate(meal);
        console.log("mealResponse", );
    }

    return (
        <div className="flex flex-wrap justify-around gap-10 mt-10">
            {meals && meals.results.length > 0 ? ( 
                meals.results.map((meal: GetRecipeByID) => {
                    const steps = convertSteps(meal);

                    const formattedMeal: CreateMeal = {
                        title: meal.title,
                        spoonacularId: meal.id,
                        steps: steps,
                        ingredients: convertIngredients(meal),
                        nutrition: convertNutrition(meal),
                        userId: session.data.user.id,
                        image: meal.image || "https://via.placeholder.com/300",
                        servedAtDay: dayjs(day).toDate(),
                        servedAtTime: type
                    }

                    return (
                        <div key={meal.id}>
                            <MealCard createMeal={formattedMeal} buttonText="Add" createAction={createNewMeal}/>

                        </div>
                    )
                })
            ) : (
                <h1>No meals found</h1>
            )}
        </div>
    )
}

Results.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>
}

export default Results;