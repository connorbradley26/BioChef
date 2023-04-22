// TODO: Make this an actual type, by connecting to API and DB to get proper data. This is just dummy data for now.

import { spoonacularMeal } from "@/types";
import Link from "next/link";


export default function Meal({meal, day} : {meal: spoonacularMeal, day: string}) {
    return (
        <li className="mx-10 my-10 carousel-item">
            <div className="shadow card w-96 bg-base-200">
                <figure>
                    <img src={meal.image} alt={meal.title} className="pointer-events-none" />
                </figure>
                <div className="pointer-events-none card-body">
                    <h2 className="card-title">{meal.title}</h2>
                    <p className="card-subtitle">{day}</p>
                    <p className="card-subtitle">{meal.calories}</p>
                    <div className="justify-end card-actions">
                        <Link href={`/individual-meal/${meal.id}`}>
                            <button className="pointer-events-auto btn btn-primary">View</button>
                        </Link>
                    </div>
                </div>

            </div>
        </li>
    );
}
