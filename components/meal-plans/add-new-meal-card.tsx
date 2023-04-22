// TODO: Make this an actual type, by connecting to API and DB to get proper data. This is just dummy data for now.

import Link from "next/link";

type MealPlan = {
    id: number;
    title: string;
    image: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

export default function AddNewMealCard({meal} : {meal: MealPlan}) {
    return (
        <li className="mx-10 my-10 carousel-item">
            <div className="shadow card w-96 bg-base-200">
                <figure>
                    <img src={meal.image} alt={meal.title} className="pointer-events-none" />
                </figure>
                <div className="pointer-events-none card-body">
                    <h2 className="card-title">{meal.title}</h2>
                    <p className="card-subtitle">{meal.calories}</p>
                    <div className="justify-end card-actions">
                        <Link href={`/individual-meal/${meal.id}`}>
                            <button className="pointer-events-auto btn btn-primary">Add</button>
                        </Link>
                    </div>
                </div>

            </div>
        </li>
    );
}
