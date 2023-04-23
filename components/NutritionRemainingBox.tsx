import { api } from "@/lib/api";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";

const NutritionRemainingBox = () => {
    const router = useRouter();
    const { day } = router.query as { day: string };

    const { data: meals } = api.meals.getMealsByDateRange.useQuery({ dateFrom: dayjs(day).toDate(), dateTo: dayjs(day).toDate() });

    const calculateRemaining = (nutrient: string) => {
        if (!meals) {
            return 0;
        }
        const totalCals = meals.reduce((acc, meal) => {
            return acc + (meal.nutrition?.calories || 0);
        }, 0);

        const totalProtein = meals.reduce((acc, meal) => {
            return acc + (meal.nutrition?.protein || 0);
        }, 0);

        const totalFat = meals.reduce((acc, meal) => {
            return acc + (meal.nutrition?.fat || 0);
        }, 0);

        const totalCarbs = meals.reduce((acc, meal) => {
            return acc + (meal.nutrition?.carbs || 0);
        }, 0);

        switch (nutrient) {
            case "calories":
                return 2000 - totalCals;
            case "protein":
                return 73 - totalProtein;
            case "fat":
                return 65 - totalFat;
            case "carbs":
                return 300 - totalCarbs;
            default:
                return 0;
        }
    };

    return (
        <div className="shadow card bg-base-100">
            <div className="card-body">
                <div className="flex items-center gap-4 card-title">Nutition remaining for {dayjs(day).format("dddd")}</div>
            </div>
            <div className="shadow stats stats-vertical">
                <div className="stat">
                    <div className="stat-title">Calories</div>
                    <div className="stat-value">
                        {calculateRemaining("calories")}
                        <span className="ml-1 text-xl">kcal</span>
                    </div>
                    <div className="stat-desc">Out of 2000kcal</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Protein</div>
                    <div className="stat-value">
                        {calculateRemaining("protein")}
                        <span className="ml-1 text-xl">g</span>
                    </div>
                    <div className="stat-desc">Out of 200g</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Fat</div>
                    <div className="stat-value">
                        {calculateRemaining("fat")}
                        <span className="ml-1 text-xl">g</span>
                    </div>
                    <div className="stat-desc">Out of 200g</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Carbs</div>
                    <div className="stat-value">
                        {calculateRemaining("carbs")}
                        <span className="ml-1 text-xl">g</span>
                    </div>
                    <div className="stat-desc">Out of 200g</div>
                </div>
            </div>
        </div>
    );
};

export default NutritionRemainingBox;
