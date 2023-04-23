import { useMealCardContext } from "./MealCardContext";
import Image from "next/image";


const MealCardImage = () => {
    const { createMeal, getMeal } = useMealCardContext();

    return (
        <figure className="pointer-events-none">
            {createMeal ? <Image src={createMeal.image} alt={createMeal.title} width={384} height={284} />
                : getMeal ? <Image src={getMeal.image} alt={getMeal.name} width={384} height={284} />
                    : null}              
        </figure>
    )
};

export default MealCardImage;