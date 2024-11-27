import { Seats } from "./seats.model";

export class Theater {
    id?:number;
    capacity:number;
    location:string;
    seats?:Seats[]; 
}
