export enum RECIPE_CATEGORIES {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
    SNACKS = "snacks",
    ALL = "all",
    DESSERTS = "desserts",
}

export const RECIPE_CATEGORIES_LABELS: Record<RECIPE_CATEGORIES, string> = {
    [RECIPE_CATEGORIES.BREAKFAST]: "Café da Manhã",
    [RECIPE_CATEGORIES.LUNCH]: "Almoço",
    [RECIPE_CATEGORIES.DINNER]: "Jantar",
    [RECIPE_CATEGORIES.SNACKS]: "Snacks",
    [RECIPE_CATEGORIES.DESSERTS]: "Sobremesas",
    [RECIPE_CATEGORIES.ALL]: "Ver todos",
};
    