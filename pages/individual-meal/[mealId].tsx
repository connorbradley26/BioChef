
import MealIngredients from "@/components/MealDescription/MealIngredients";
import MealRecipe from "@/components/MealDescription/MealRecipe";
import MealImage from "@/components/MealImage";
import MealNutritionInfo from "@/components/NutritionTable";
import { api } from "@/lib/api";
import RootLayout from "@/pages/layout";
import { prisma } from "@/server/api/db";
import { appRouter } from "@/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ReactElement } from "react";
import SuperJSON from "superjson";


export async function getStaticProps(ctx: GetStaticPropsContext<{ mealId: string }>) {
    console.log("Getting Static Props in individual-meal/", ctx.params)
    if (!ctx.params) {
        return {
            notFound: true,
        };
    }
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {auth: null, prisma: prisma, userId: null},
        transformer: SuperJSON, 
      });


    const mealId = parseInt(ctx.params.mealId);

    await helpers.meals.getMealInstructions.prefetch({ mealId: mealId });
    await helpers.meals.getMealById.prefetch({ mealId: mealId.toString()});   // TODO - turn meal id input to string

    return {
      props: {
        trpcState: helpers.dehydrate(),
        mealId,
      }
    };
  }

  export const getStaticPaths: GetStaticPaths = async () => {
    const meals = await prisma.meal.findMany({
        select: { 
            spoonacularId: true
        }
    });

    return {
      paths: meals.map((meal) => ({
        params: {
          mealId: meal.spoonacularId.toString()
        },
      })),
      // Wait for SSR if not already generated.
      fallback: 'blocking',
    };
  };

const IndividualMeal = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { mealId } = props;
    if (!mealId) {
        return <div>Meal not found</div>
    }
    const getMealByIdQuery = api.meals.getMealById;
    const getMealInstructionsQuery = api.meals.getMealInstructions;
    
    const { data: meal } = getMealByIdQuery.useQuery({ mealId: mealId + "" || "638604" },
              { refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false});
    const { data: instructions } = getMealInstructionsQuery.useQuery({ mealId: mealId || 638604 },
              { refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false});

    if (!meal) {
        return <div>Meal not found</div>
    }
    
    if (!instructions) {
        return <div>Instructions not found</div>
    }

    return (
        <main className="grid grid-cols-1 gap-6 m-10 md:grid-cols-3">
            <div className="relative rounded shadow-xl">
                <MealImage  src={meal.image} alt={meal.title} />
            </div>
            {/* <pre className="md:col-span-2 bg-base-100 card">{JSON.stringify(meal, null, 2)}</pre> */}
            { meal.nutrition && meal.nutrition.nutrients &&
            <>
              <MealNutritionInfo nutritionInfo={meal.nutrition.nutrients}/>
              <MealIngredients ingredients={meal.nutrition.ingredients} /> 
            </>
            }
            <div className=" md:col-span-3">
                <MealRecipe instructions={instructions} /> 
            </div>
        </main>
    )
    
}

IndividualMeal.getLayout = (page: ReactElement) => {
    return <RootLayout>{page}</RootLayout>
}

export default IndividualMeal;