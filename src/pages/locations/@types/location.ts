export type Location = {
    id: string;
    name: string;
    rating: number;
    location : {
        lat: number;
        lng: number;
    }
    reviews: String[];
    description: string;
};