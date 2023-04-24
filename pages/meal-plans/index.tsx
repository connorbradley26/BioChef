import MealPlanScroller from "@/components/MealPlanScroller";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { api } from "@/lib/api";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dayjs from "dayjs";
import { appRouter } from "@/server/api/root";
import SuperJSON from "superjson";
import { createServerSideHelpers } from '@trpc/react-query/server';
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/server/api/db";
import LoadingSpinner from "@/components/LoadingSpinner";

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }> ) {

    const auth = getAuth(ctx.req);
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { auth: auth, prisma: prisma, userId: auth.userId },
        transformer: SuperJSON,
      });

    await helpers.meals.getMealsByDateRange.prefetch(
        { dateFrom: new Date(dayjs().subtract(1, "day").format("YYYY-MM-DD")), 
          dateTo: new Date(dayjs().add(7, "day").format("YYYY-MM-DD")) });

    return {
        props:{
            trpcState: helpers.dehydrate()
        }
    }
}

interface Props { 
    props: InferGetServerSidePropsType<typeof getServerSideProps>
}

const MealPlansPage: NextPageWithLayout<Props> = (props: Props) => {
    const mealPlanQuery = api.meals.getMealsByDateRange.useQuery({
        dateFrom: new Date(dayjs().subtract(1, "day").format("YYYY-MM-DD")), 
        dateTo: new Date(dayjs().add(7, "day").format("YYYY-MM-DD"))
    })

    const { data: mealPlan } = mealPlanQuery;
    // TODO: Add error handling 
    if (!mealPlan) return (<LoadingSpinner/>);

    console.log(mealPlan)

    return (
        <main className="mx-10 my-20">
            <MealPlanScroller eatingTime="Breakfast" meals={mealPlan.filter((meal) => meal.servedAtTime == "Breakfast")}/>
            <MealPlanScroller eatingTime="Lunch" meals={mealPlan.filter((meal) => meal.servedAtTime == "Lunch")}/>
            <MealPlanScroller eatingTime="Dinner" meals={mealPlan.filter((meal) => meal.servedAtTime == "Dinner")}/>
        </main>
    )
}

MealPlansPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default MealPlansPage;