// TODO: Make this an actual type, by connecting to API and DB to get proper data. This is just dummy data for now.

type MealPlan = {
    id: number;
    name: string;
    description: string;
    image: string;
};

export default function Meal({meal} : {meal: MealPlan}) {
    return (
        <div className="mx-10 carousel-item">
            <div className="shadow-xl card w-96 bg-base-100">
                <figure>
                    <img src={meal.image} alt={meal.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{meal.name}</h2>
                    <p className="card-subtitle">{meal.description}</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Edit</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
