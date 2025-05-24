export type Location = {
    place_id: string;
    name: string;
    media: number;
    adress: string;
    location : {
        lat: number;
        lng: number;
    }
    reviews: String[];
    description: string;
};

export type Feedback = {
    autor: string;
    comentario: string;
    nota: number;
};