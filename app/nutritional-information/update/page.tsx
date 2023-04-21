"use client";

import NutritionInfoUpdate from "@/components/nutrition-info-update";
import { getCurrentUser } from "@/lib/session";

export default async function Page() {

    return (
        <main className="md:m-10 ">
            <NutritionInfoUpdate />
        </main>
    );
}
