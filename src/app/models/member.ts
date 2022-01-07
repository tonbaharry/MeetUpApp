import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    age: number;
    Age: number;
    knownAs: string;
    createDt: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photoUrl: string;
    photos: Photo[];
    OrderBy: string;
}

