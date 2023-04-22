import { chartData } from "@/types";
import { UserNutritionalStats } from "@prisma/client";

const PrettyNamedStats = {
    weight: "Weight",
    height: "Height",
    age: "Age",
    restingHeartRate: "Resting Heart Rate",
    Cholesterol: "Cholesterol",
    bodyFatPercentage: "Body Fat Percentage",
    vitaminD: "Vitamin D",
    vitaminB12: "Vitamin B12",
    vitaminB6: "Vitamin B6",
    vitaminC: "Vitamin C",
    testosterone: "Testosterone",
    hbA1c: "HbA1c",
    goal: "Goal",
};

const userNutritionalStatsTable = [
    "weight",
    "height",
    "age",
    "restingHeartRate",
    "Cholesterol",
    "bodyFatPercentage",
    "vitaminD",
    "vitaminB12",
    "vitaminB6",
    "vitaminC",
    "testosterone",
    "hbA1c",
    "goal",
];


const convertToChartJSdata = (statsArr: UserNutritionalStats[]) => {

    let chartData: chartData = {
        labels: [],
        datasets: [],
    };
    if (!statsArr) return chartData;
    for (let stat of statsArr) {
        for (let key in stat) {
            if (key === "createdAt") { 
                chartData.labels.push(stat[key].toLocaleDateString());
                continue;
            }
            if (!userNutritionalStatsTable.includes(key)) continue;
            if (stat.hasOwnProperty(key)) {
                if (chartData.datasets.find((set) => set.type === key)) {
                    // @ts-ignore - this works fine, but typescript doesn't like it
                    chartData.datasets.find((set) => set.type === key)?.data.push(stat[key]);
                } else {
                    // @ts-ignore - same with this. Theres a better way to do this, but I'm not sure what it isß
                    chartData.datasets.push({ type: key, data: [stat[key]] })
                }
            } else {
                console.log("stat[key] does not exist");
            }
        }
    }

    return chartData;
};

export default convertToChartJSdata;
