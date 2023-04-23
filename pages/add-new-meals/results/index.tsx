import MealCard from "@/components/meal-plans/meal-card";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";


const Results = () => {

    let meals = { results: []} 
    if (typeof window !== "undefined") {
       meals = localStorage.getItem("MealSuggestions") ? JSON.parse(localStorage.getItem("MealSuggestions") as string) : null;
    }
    return (
        <div>
            {meals && meals.results.length > 0 ? ( 
                meals.results.map((meal: GetRecipeByID) => {

                    return (
                        <div key={meal.id}>
                            <MealCard meal={meal} day="" />

                        </div>
                    )
                })
            ) : (
                <h1>No meals found</h1>
            )}
            <pre>{JSON.stringify(meals, null, 2)}</pre>
        </div>
    )
}

export default Results;