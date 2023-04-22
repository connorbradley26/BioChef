import { Flavonoid } from "@/types/Spoonacular/GetRecipeByID";

export default function MealNutritionInfo({
    nutritionInfo,
}: {
    nutritionInfo: Flavonoid[];
}) {


    return (
        <div className="shadow card bg-base-100">
            <div className="card-body">
                {/* <pre className="card-subtitle">{JSON.stringify(nutritionInfo.nutrients, null, 2)}</pre> */}
                <div className="flex items-center gap-4">
                    <table className="table table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nutrient</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Daily Needs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritionInfo.map((nutrient) => {
                                return (
                                    <tr key={nutrient.name}>
                                        <td className="px-4 py-2 border">
                                            {nutrient.name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {nutrient.amount} {nutrient.unit}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {nutrient.percentOfDailyNeeds}% of
                                            daily needs
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="text-sm font-medium leading-6"> </div>
                </div>
            </div>
        </div>
    );
}
