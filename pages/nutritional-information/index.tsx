import NutritionalBox from "@/components/nutritional-box";
import YourNeedsBox from "@/components/your-needs-box";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "@/server/api/db";
import { UserNutritionalStats } from "@prisma/client";
import convertToChartJSdata from "@/lib/convertToChartJSData";
import { Key, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const userStats = await prisma.userNutritionalStats.findMany({
        where: {
            userId: ctx.req.cookies.userId,
        },
    });
    const chartData = convertToChartJSdata(userStats);
    console.log(chartData);

    return {
        props: {
            chartData: chartData,
        },
    };
};

const NutritionalInformation: NextPageWithLayout = () => {
    const session = useSession();
    const {
        data: userNutStats,
        isLoading,
        isSuccess,
    } = api.userNutritionalStats.getAllByUserId.useQuery({
        userId: session.data?.user.id || "",
    });
    const [activeTab, setActiveTab] = useState<number>(0);

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
                                            <a
                                                key={data.type}
                                                className={`${activeTab == index ? "tab-active " : ""}  tab`}
                                                onClick={() =>
                                                    setActiveTab(index)
                                                }>
                                                {data.type}
                                            </a>
                                        </>
                                    );
                                })}
                        </div>
                        <NutritionalBox
                            labels={chartData.labels}
                            data={chartData.datasets[activeTab]}
                        />
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
    return <div> Loading... </div>;
};

NutritionalInformation.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>;
};

export default NutritionalInformation;
