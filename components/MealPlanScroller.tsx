import { useRef, useState } from "react";
import MealCard from "./MealCard/MealCard";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { RouterOutputs } from "@/lib/api";
type meals = RouterOutputs["meals"]["getMealsByDateRange"][number];

interface MealPlanProps {
    eatingTime: string;
    meals: meals[];
}

export default function MealPlanScroller({ eatingTime, meals }: MealPlanProps) {
    // Controls the scrolling of the carousel
    const [isScrolling, setIsScrolling] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const ref = useRef<HTMLUListElement>(null);

    // More scrolling logic
    const handleMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        setIsScrolling(true);
        setClientX(e.clientX);
        if (ref.current) {
            setScrollX(ref.current.scrollLeft);
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        setIsScrolling(false);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        if (isScrolling && ref.current) {
            ref.current.scrollLeft = scrollX - e.clientX + clientX;
        }
    };

    return (
        <div className="relative my-8">
            {/* Blur the edges of the scroller */}
            <div className="absolute top-0 left-0 z-30 w-full h-full pointer-events-none ">
                <div className="absolute top-0 left-0 z-30 w-10 h-full bg-gradient-to-r from-base-100 to-transparent"></div>
                <div className="absolute top-0 right-0 z-30 w-10 h-full bg-gradient-to-r from-transparent to-base-100"></div>
            </div>
            {/* The actual scroller */}
            <div className="shadow-inner rounded-box bg-base-200">
                <h1 className="flex justify-center pt-5 mx-10 font-mono text-xl font-bold">{eatingTime}</h1>
                <ul className="flex overflow-x-scroll select-none carousel-end carousel scroll-smooth scrollbar-hide" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} ref={ref} onMouseMove={onMouseMove}>
                    {/* Loop by day rather than any particular array */}
                    {[...Array(7)].map((_, index) => {
                        const mealForDay = meals?.find((meal) => dayjs(meal.servedAtDay).day() == dayjs().add(index, "day").day());
                        return (
                            <li key={index} className="flex flex-col mx-10 my-10 carousel-item">
                                <p className="flex justify-center pb-2 font-mono text-lg">{dayjs().add(index, "day").format("dddd")}</p>
                                {mealForDay ? <MealCard getMeal={mealForDay} link={`/individual-meal/${mealForDay.spoonacularId}`} buttonText="View" /> : <MealCard link={`/add-new-meals?type=${eatingTime}&day=${dayjs().add(index, "day").format("YYYY-MM-DD")}`} buttonText="Add New" />}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
