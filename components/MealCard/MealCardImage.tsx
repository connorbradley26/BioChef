import { useMealCardContext } from "./MealCardContext";
import Image from "next/image";


const MealCardImage = () => {
    const { meal } = useMealCardContext();

    return (
        <figure>
            {meal && <Image src={meal.image} alt={meal.title} width={500} height={500} />}              
        </figure>
    )
};

export default MealCardImage;