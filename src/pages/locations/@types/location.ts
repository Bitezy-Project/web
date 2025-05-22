export type Location = {
    place_id: string;
    name: string;
    rating: number;
    adress: string;
    location : {
        lat: number;
        lng: number;
    }
    reviews: String[];
    description: string;
};