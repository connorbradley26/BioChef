import MealCard from "@/components/MealCard/MealCard";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";
import { useRouter } from "next/router";


const Results = () => {
    const router = useRouter();
    const { type, day } = router.query as { type: "Breakfast" | "Lunch" | "Dinner"; day: "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" };
    
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
                            {/* <MealCard meal={meal} day="" /> */}

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