import { RouterInputs, RouterOutputs } from '@/lib/api';
import { Meal } from '@prisma/client';
import { createContext, useContext } from 'react';
type CreateMeal = RouterInputs["meals"]["createMeal"];
type GetMeal = RouterOutputs["meals"]["getMealsByDateRange"][number];

const MealCardContext = createContext<{ getMeal?: GetMeal, createMeal?: CreateMeal, link?: string, buttonText?: string, createAction?: (meal: CreateMeal ) => void, getAction?: (meal: GetMeal) => void } | null>(null);

export function useMealCardContext() {
  const context = useContext(MealCardContext);

  if (!context) {
    throw new Error('MealCardContext must be used within a MealCardContextProvider');
  }
  return context;
}

export default MealCardContext;