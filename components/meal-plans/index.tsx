"use client";

import Image from "next/image";
import Meal from "./meal-card";
import type { mealPlans as MealPlanType } from "@/types";
import { useRef, useState } from "react";

type MealPlanProps = {
    mealPlans: MealPlanType[];
    //TODO type this
    eatingTime: string;
};

export default function MealPlans({ mealPlans, eatingTime }: MealPlanProps) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const ref = useRef<HTMLUListElement>(null);

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

    // TODO: Get meal plans from database

    return (
        <>
            <h1 className="mx-10 mt-20 mb-10 text-xl ">{eatingTime}</h1>
            <ul
                className="flex overflow-x-scroll select-none scroll-smooth scrollbar-hide carousel"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={ref}
                onMouseMove={onMouseMove}>
                {mealPlans.map((mealPlan) => (
                    <Meal meal={mealPlan} key={mealPlan.id} />
                ))}
            </ul>
        </>
    );
}