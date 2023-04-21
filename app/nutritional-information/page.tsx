import NutritionalBox from "@/components/nutritional-box";
import YourNeedsBox from "@/components/your-needs-box";

export default async function Page() {
    return (
        <main className="grid grid-cols-1 gap-6 px-10 mx-auto mt-10 md:grid-cols-3">
            <div className="md:col-span-2 rounded-box">
                <div className="grid grid-cols-1 gap-6 card-body lg:grid-cols-2 xl:grid-cols-3">
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                    <NutritionalBox />
                </div>
            </div>
            <div className=" rounded-box">
                <div className="flex flex-wrap items-center gap-6 ">
                    <YourNeedsBox />
                    
                </div>
            </div>
        </main>
    );
}
