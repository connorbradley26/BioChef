import { Meal } from '@prisma/client';
import { createContext, useContext } from 'react';

const MealCardContext = createContext<{ meal?: Meal } | null>(null);

export function useMealCardContext() {
  const context = useContext(MealCardContext);

  if (!context) {
    throw new Error('MealCardContext must be used within a MealCardContextProvider');
  }
  return context;
}

export default MealCardContext;