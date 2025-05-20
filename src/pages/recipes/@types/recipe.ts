// export type TRecipe = {
//     id: string;
//     name: string;
//     image: string;
//     time: string;
//     ingredients: string[]
//     difficulty: string;
//     rating: number;
//     preparation: string;
// };


export type TRecipe = {
    id: string;
    title: string
    category: string
    difficulty: string
    prep_time: number
    ingredients:string []
    steps: string[]
    restrictions: string[]   
    rating: number           
    feedbacks: Feedback[]  
}

export type Feedback = {
    autor: string;
    comentario: string;
    rating: number;
};