import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faDna, faFlask, faBolt } from "@fortawesome/free-solid-svg-icons";



interface MealNutritionInfoProps {
    nutritionInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    }
}

export default function MealNutritionInfo({nutritionInfo}: MealNutritionInfoProps) {
    
    return (
        <div className="shadow-xl card bg-base-100">

            <div className="card-body">
                <div className="card-title">
                    <h2 className="text-xl">Nutrition Info</h2>
                </div>
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faFire} />
                    <div className="text-sm font-medium leading-6">{nutritionInfo.calories}kcal </div>
                </div>
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faDna} />
                    <div className="text-sm font-medium leading-6">{nutritionInfo.protein}g </div>
                </div>
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faFlask} />
                    <div className="text-sm font-medium leading-6">{nutritionInfo.fat}g </div>
                </div>
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faBolt} />
                    <div className="text-sm font-medium leading-6">{nutritionInfo.carbs}g </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="lg:col-start-3 lg:row-end-1 card bg-base-100">
        <h2 className="sr-only">Summary</h2>
        <div className="rounded-lg shadow-sm ring-1 ring-gray-900/5">
          <dl className="flex flex-wrap">
            <div className="flex-auto pt-6 pl-6">
              <dt className="text-sm font-semibold leading-6 ">Amount</dt>
              <dd className="mt-1 text-base font-semibold leading-6 ">$10,560.00</dd>
            </div>
            {/* Calories */}
            <div className="flex flex-none w-full px-6 pt-6 mt-6 border-t gap-x-4 border-gray-900/5">
              <dt className="flex-none">
                <FontAwesomeIcon icon={faFire} />
              </dt>
              <dd className="text-sm font-medium leading-6">{nutritionInfo.calories}kcal</dd>
            </div>
            {/* Protein */}
            <div className="flex flex-none w-full px-6 mt-4 gap-x-4">
              <dt className="flex-none">
                <FontAwesomeIcon icon={faDna} />               
              </dt>
              <dd className="text-sm font-medium leading-6">{nutritionInfo.protein}g</dd>
            </div>
            <div className="flex flex-none w-full px-6 mt-4 gap-x-4">
              <dt className="flex-none">
                <FontAwesomeIcon icon={faFlask} />
                
              </dt>
              <dd className="text-sm leading-6">{nutritionInfo.fat}g</dd>
            </div>
          </dl>
        </div>
      </div>
    )
}