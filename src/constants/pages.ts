export enum PAGES_PATH {
    HOME = "/",
    EDUCATIONAL = "/educational",
    PRODUCTS = "/products",
    RECIPES = "/recipes",
    LOCATIONS = "/locations",
    REGISTER = "/register",
}

interface PageMessage {
    title: string;
    description: string;
    returnButton: boolean
}

export const PAGES_MESSAGE = {
    [PAGES_PATH.HOME]: {
        title: "Olá!",
        description: "O que você quer comer hoje?",
        returnButton: false
    },
    [PAGES_PATH.EDUCATIONAL]: {
        title: "Informações Educacionais",
        description: "Aqui você encontra informações sobre como se alimentar de forma saudável e segura.",
        returnButton: true
    },
    [PAGES_PATH.PRODUCTS]: {
        title: "Sugestão de Produtos",
        description: "Aqui você encontra sugestões de produtos seguros para o seu consumo.",
        returnButton: true
    },
    [PAGES_PATH.RECIPES]: {
        title: "Receitas Seguras",
        description: "Aqui você encontra receitas seguras para o seu consumo.",
        returnButton: true
    },
    [PAGES_PATH.LOCATIONS]: {
        title: "Locais Confiáveis",
        description: "Aqui você encontra locais confiáveis para o seu consumo.",
        returnButton: true
    },
    [PAGES_PATH.REGISTER]: {
        title: "Register",
        description: "Faça cadastro",
        returnButton: true
    },
} satisfies Record<PAGES_PATH, PageMessage>;