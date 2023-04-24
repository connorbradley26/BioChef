import NutritionInfoUpdateForm from "@/components/UpdateNutritionInfo/NutritionalInfoUpdateForm";
import { NextPageWithLayout } from "@/pages/_app";
import RootLayout from "@/pages/layout";

interface Props {}

const NutritionInfoUpdatePage: NextPageWithLayout<Props> = () => {

    return (
        <main className="md:m-10 ">
            <NutritionInfoUpdateForm />
        </main>
    );
}

NutritionInfoUpdatePage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default NutritionInfoUpdatePage;
