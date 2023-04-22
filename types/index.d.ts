export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      github: string
    }
  }
  

export type mealPlans = {
    id: number,
    name: string,
    description: string,
    ingredients: { id: number, name: string, quantity: number, unit: string }[],
    instructions: { id: number, step: string }[],
    nutrition: { calories: number, fat: number, carbs: number, protein: number },
    image: string,
}

export type chartData = {
    labels: string[],
    datasets: dataset[]
}

export type dataset = {
    type: string,
    data: number[] | string[]
}

export type spoonacularMeal = {
    id: number,
    calories: number,
    carbs: string,
    fat: string,
    protein: string,
    title: string,
    image: string,
    imageType: string,
}