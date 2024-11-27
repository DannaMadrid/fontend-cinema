import { Theater } from "./theater.model";

export class Seats {
    id?:number;
    location:string;
    reclining:boolean;
    theater_id?:number;
    theater?:Theater
}
