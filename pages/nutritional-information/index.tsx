import NutritionalBox from "@/components/NutritionChart";
import YourNeedsBox from "@/components/YourNeedsBox";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "@/server/api/db";
import { UserNutritionalStats } from "@prisma/client";
import convertToChartJSdata from "@/lib/convertToChartJSData";
import { Key, useState } from "react";
import { api } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

const NutritionalInformation: NextPageWithLayout = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { user, isSignedIn} = useUser();

    const { data: userNutStats, isLoading, isSuccess, isError } = api.userNutritionalStats.getAllByUserId.useQuery({
        userId: user?.id || "",
    });


    if (isSuccess) {
        const chartData = convertToChartJSdata(userNutStats);
        console.log(chartData);

        return (
            <main className="grid grid-cols-1 gap-6 px-10 mx-auto mt-10 md:grid-cols-3">
                <div className="rounded-box md:col-span-2">
                    <div className="gap-6 ">
                        <div className="tabs tabs-boxed">
                            {chartData &&
                                chartData.datasets &&
                                chartData.datasets.map((data, index) => {
                                    return (
                                        <>
                                            <a key={index} className={`${activeTab == index ? "tab-active " : ""}  tab`} onClick={() => setActiveTab(index)}>
                                                {data.type}
                                            </a>
                                        </>
                                    );
                                })}
                        </div>
                        <NutritionalBox labels={chartData.labels} data={chartData.datasets[activeTab]} />
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
    if (isLoading) {
        // TODO - add loading spinner
        return <div> Loading... </div>;
    }
    if (isError) {
        // TODO - add error message
        return <div> Error </div>;
    }
    return <div> Error </div>;
};

NutritionalInformation.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>;
};

export default NutritionalInformation;
