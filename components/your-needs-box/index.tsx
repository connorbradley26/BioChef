

export default function YourNeedsBox() {

    const dummydata = [
        {
            "id": 1,
            "name": "Calories",
            "description": "Calories are a measure of how much energy is in food. The body uses calories for energy. The body also uses calories to build and repair tissues. The body stores extra calories as fat.",
            "value": "2000kcal"
        },
        {
            "id": 2,
            "name": "Protein",
            "description": "Protein is a nutrient that is essential for the growth and repair of tissues in the body. It is also a major component of many body fluids, including blood, and is required for the production of hormones and enzymes.",
            "value": "100g"
        },
        {
            "id": 3,
            "name": "Carbohydrates",
            "description": "Carbohydrates are a nutrient that is found in foods such as bread, pasta, rice, potatoes, fruits, and vegetables. Carbohydrates are the body's main source of energy. They are broken down into glucose, which is used by the body for energy.",
            "value": "200g"
        },
        {
            "id": 4,
            "name": "Fat",
            "description": "Fat is a nutrient that is found in foods such as butter, oil, and fatty meats. Fat is an important part of a healthy diet. It provides energy and helps the body absorb vitamins.",
            "value": "50g"
        },
        {
            "id": 5,
            "name": "Fiber",
            "description": "Fiber is a nutrient that is found in foods such as fruits, vegetables, and whole grains. Fiber is important for a healthy digestive system. It helps the body get rid of waste.",
            "value": "50g"
        },
        {
            "id": 6,
            "name": "Sodium",
            "description": "Sodium is a nutrient that is found in foods such as salt, soy sauce, and processed meats. Sodium is important for a healthy digestive system. It helps the body get rid of waste.",
            "value": "50g"
        },
    ]

    return (
        <div className="max-w-md card">
            <div className="card-body">
                {dummydata.map((item) => (
                    <div className="" key={item.id}>
                        <div tabIndex={0} className="border collapse collapse-arrow border-base-300 bg-base-100 rounded-box">
                            <div className="text-xl font-medium collapse-title">
                                {item.name}
                            </div>
                            <div className="collapse-content">
                                <p>{item.description}</p>
                                Reccomended value: <pre>{item.value}</pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}