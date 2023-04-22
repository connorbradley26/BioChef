// To parse this data:
//
//   import { Convert, GetNutritionByID } from "./file";
//
//   const getNutritionByID = Convert.toGetNutritionByID(json);

export interface GetNutritionByID {
    nutrients?:        Flavonoid[];
    properties?:       Flavonoid[];
    flavonoids?:       Flavonoid[];
    ingredients?:      Ingredient[];
    caloricBreakdown?: CaloricBreakdown;
    weightPerServing?: WeightPerServing;
}

export interface CaloricBreakdown {
    percentProtein?: number;
    percentFat?:     number;
    percentCarbs?:   number;
}

export interface Flavonoid {
    name?:                string;
    amount?:              number;
    unit?:                string;
    percentOfDailyNeeds?: number;
}

export interface Ingredient {
    id?:        number;
    name?:      string;
    amount?:    number;
    unit?:      string;
    nutrients?: Flavonoid[];
}

export interface WeightPerServing {
    amount?: number;
    unit?:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toGetNutritionByID(json: string): GetNutritionByID {
        return JSON.parse(json);
    }

    public static getNutritionByIDToJson(value: GetNutritionByID): string {
        return JSON.stringify(value);
    }
}
