import { useRef, useState } from "react";
import MealCard from "./MealCard/MealCard";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

interface MealPlanProps {
    eatingTime: string;
}

export default function MealPlanScroller({ eatingTime }: MealPlanProps) {
    // Controls the scrolling of the carousel
    const [isScrolling, setIsScrolling] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const ref = useRef<HTMLUListElement>(null);

    // Fetch meal plans from API
    const  { user, isSignedIn } = useUser();
    const mealPlan = api.meals.getMealsByDateRange.useQuery(
        {
            dateFrom: new Date(dayjs().subtract(1, "day").format("YYYY-MM-DD")),
            dateTo: new Date(dayjs().add(7, "day").format("YYYY-MM-DD")),
        },
        { refetchOnWindowFocus: false }
    );

    // TODO - handle loading and error states
    if (!isSignedIn) {
        return (
            <div>
                <h1>Not logged in</h1>
            </div>
        );
    }

    // More scrolling logic
    const handleMouseDown = (
        e: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
        setIsScrolling(true);
        setClientX(e.clientX);
        if (ref.current) {
            setScrollX(ref.current.scrollLeft);
        }
    };

    const handleMouseUp = (
        e: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
        setIsScrolling(false);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        if (isScrolling && ref.current) {
            ref.current.scrollLeft = scrollX - e.clientX + clientX;
        }
    };

    return (
        <div className="relative my-8">
             <div className="absolute top-0 left-0 z-30 w-full h-full pointer-events-none ">
                <div className="absolute top-0 left-0 z-30 w-10 h-full bg-gradient-to-r from-base-100 to-transparent"></div>
                <div className="absolute top-0 right-0 z-30 w-10 h-full bg-gradient-to-r from-transparent to-base-100"></div>
                
             </div>
            <div className="shadow-inner rounded-box bg-base-200">
                <h1 className="flex justify-center pt-5 mx-10 font-mono text-xl font-bold">
                    {eatingTime}
                </h1>
                <ul
                    className="flex overflow-x-scroll select-none carousel-end carousel scroll-smooth scrollbar-hide"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    ref={ref}
                    onMouseMove={onMouseMove}>
                    {/* Loop by day rather than any particular array */}
                    {[...Array(7)].map((_, index) => {
                        const mealForDayTime = mealPlan.data?.find(
                            (meal) =>
                                meal.servedAtTime === eatingTime &&
                                dayjs(meal.servedAtDay).format("YYYY-MM-DD") ===
                                    dayjs()
                                        .add(index, "day")
                                        .format("YYYY-MM-DD")
                        );
                        return (
                            <li
                                key={index}
                                className="flex flex-col mx-10 my-10 carousel-item">
                                <p className="flex justify-center pb-2 font-mono text-lg">
                                    {dayjs().add(index, "day").format("dddd")}
                                </p>
                                {mealForDayTime ? (
                                    <MealCard
                                        getMeal={mealForDayTime}
                                        link={`/individual-meal/${mealForDayTime.spoonacularId}`}
                                        buttonText="View"
                                    />
                                ) : (
                                    <MealCard
                                        link={`/add-new-meals?type=${eatingTime}&day=${dayjs()
                                            .add(index, "day")
                                            .format("YYYY-MM-DD")}`}
                                        buttonText="Add New"
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
           
        </div>
    );
}
