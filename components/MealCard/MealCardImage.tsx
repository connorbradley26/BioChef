import { useMealCardContext } from "./MealCardContext";
import Image from "next/image";


const MealCardImage = () => {
    const { createMeal, getMeal } = useMealCardContext();

    // Spoonacular API has  image sizes in the URL, so we can replace the size with a larger one
    return (
        <figure className="pointer-events-none">
            {createMeal ? <Image src={createMeal.image.replace("312x231", "636x393")} alt={createMeal.title} width={636} height={393} />
                : getMeal ? <Image src={getMeal.image.replace("312x231", "636x393")} alt={getMeal.name} width={636} height={393} />
                    : null}              
        </figure>
    )
};

export default MealCardImage;