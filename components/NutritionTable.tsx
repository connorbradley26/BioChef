import { RouterOutputs } from "@/lib/api";
type Nutrition = RouterOutputs["meals"]["getMealById"]["nutrition"]["nutrients"][number];

export default function MealNutritionInfo({ nutritionInfo }: { nutritionInfo: Nutrition[] }) {
    
    const basicNutrients = nutritionInfo.filter((nutrient) => {
        return nutrient.name === "Calories" || nutrient.name === "Fat" || nutrient.name === "Carbohydrates" || nutrient.name === "Protein";
    });

    return (
        <table className="table table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Nutrient</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Daily Needs</th>
                </tr>
            </thead>
            <tbody>
                {basicNutrients.map((nutrient) => {
                    return (
                        <tr key={nutrient.name}>
                            <td className="px-4 py-2 border">{nutrient.name}</td>
                            <td className="px-4 py-2 border">
                                {nutrient.amount} {nutrient.unit}
                            </td>
                            {/* TODO: Store users nutritional needs in a db somewhere and read from there */}
                            <td className="px-4 py-2 border">{nutrient.amount}% of daily needs</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
