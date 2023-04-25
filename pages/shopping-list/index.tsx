import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../layout";
import { getAuth } from "@clerk/nextjs/server";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/api/db";
import SuperJSON from "superjson";
import dayjs from "dayjs";
import { api } from "@/lib/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const auth = getAuth(ctx.req);
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { auth: auth, prisma: prisma, userId: auth.userId },
        transformer: SuperJSON,
      });

    await helpers.ingredients.getIngredientsByDateRange.prefetch(
        { startDate: new Date(dayjs().subtract(1, "day").format("YYYY-MM-DD")), 
          endDate: new Date(dayjs().add(7, "day").format("YYYY-MM-DD")) });

    return {
        props:{
            trpcState: helpers.dehydrate()
        }
    }
}

interface Props {
    props: InferGetServerSidePropsType<typeof getServerSideProps>
}
const ShoppingListPage: NextPageWithLayout<Props> = (props: Props) => { 

    const shoppingListQuery = api.ingredients.getIngredientsByDateRange.useQuery({
        startDate: new Date(dayjs().subtract(1, "day").format("YYYY-MM-DD")),
        endDate: new Date(dayjs().add(7, "day").format("YYYY-MM-DD"))
    })
    
    const { data: shoppingList } = shoppingListQuery;

    if (!shoppingList) return (<div>Loading...</div>);
    console.log(shoppingList)
    return (
         <div className="flex items-center justify-center mt-20">
            <div className="shadow card">
                <div className="card-body">
                    <h1 className="card-title">Shopping List</h1>
                    <ul>
                        {shoppingList.map((ingredient) => {
                            return <li key={ingredient.id}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
};

ShoppingListPage.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>
}

export default ShoppingListPage;