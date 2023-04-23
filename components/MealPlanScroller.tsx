import { useRef, useState } from "react";
import MealCard from "./MealCard/MealCard";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";

interface MealPlanProps {
    eatingTime: string;
}

export default function MealPlanScroller({ eatingTime }: MealPlanProps) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const ref = useRef<HTMLUListElement>(null);
    const session = useSession();
    const mealPlan = api.meals.getMealsByDateRange.useQuery(
        {
            dateFrom: new Date(dayjs().format("YYYY-MM-DD")),
            dateTo: new Date(dayjs().add(7, "day").format("YYYY-MM-DD")),
        },
        { refetchOnWindowFocus: false, refetchOnMount: false}
    );

    if (!session?.data?.user?.id) {
        return (
            <div>
                <h1>Not logged in</h1>
            </div>
        );
    }

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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



    return (
        <>
            <h1 className="mx-10 mt-20 mb-10 text-xl ">{eatingTime}</h1>
            <ul
                className="flex overflow-x-scroll select-none carousel scroll-smooth scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={ref}
                onMouseMove={onMouseMove}>

                {days.map((day, index) => {
                    const mealForDayTime = mealPlan.data?.find(
                        (meal) =>
                            meal.servedAtTime === eatingTime &&
                            dayjs(meal.servedAtDay).format("YYYY-MM-DD") ===
                                dayjs().add(index, "day").format("YYYY-MM-DD")
                    );
                    return (
                        <li key={index} className="mx-10 my-10 carousel-item">
                            {mealForDayTime ? (
                                <MealCard getMeal={mealForDayTime} link={`/individual-meal/${mealForDayTime.spoonacularId}`}  buttonText="View"/>
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
        </>
    );
}
