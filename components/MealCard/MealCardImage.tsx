import { useMealCardContext } from "./MealCardContext";
import Image from "next/image";


const MealCardImage = () => {
    const { createMeal, getMeal } = useMealCardContext();

    return (
        <figure>
            {createMeal ? <Image src={createMeal.image} alt={createMeal.title} width={500} height={500} />
                : getMeal ? <Image src={getMeal.image} alt={getMeal.name} width={500} height={500} />
                    : null}              
        </figure>
    )
};

export default MealCardImage;