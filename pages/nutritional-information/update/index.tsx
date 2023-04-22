"use client";

import NutritionInfoUpdate from "@/components/nutrition-info-update";
import { NextPageWithLayout } from "@/pages/_app";
import RootLayout from "@/pages/layout";

const NutritionInfoUpdatePage: NextPageWithLayout = () => {

    return (
        <main className="md:m-10 ">
            <NutritionInfoUpdate />
        </main>
    );
}

NutritionInfoUpdatePage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default NutritionInfoUpdatePage;
