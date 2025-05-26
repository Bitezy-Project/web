export enum RECIPE_CATEGORIES {
    BREAKFAST = "cafe-da-manha",
    LUNCH = "almoco",
    DINNER = "jantar",
    SNACKS = "lanche",
    ALL = "all",

}

export const RECIPE_CATEGORIES_LABELS: Record<RECIPE_CATEGORIES, string> = {
    [RECIPE_CATEGORIES.BREAKFAST]: "Café da Manhã",
    [RECIPE_CATEGORIES.LUNCH]: "Almoço",
    [RECIPE_CATEGORIES.DINNER]: "Jantar",
    [RECIPE_CATEGORIES.SNACKS]: "Snacks",
    [RECIPE_CATEGORIES.ALL]: "Ver todos",
};
    