import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seats } from '../models/seats.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private http: HttpClient) {}
    list(theaterId:number): Observable<Seats[]> { 
      return this.http.get<Seats[]>(`${environment.url_ms_cinema}/seats?theater_id=${theaterId}`); //Ayuda a enlazar la ruta
    }
    delete(id:number) {
      return this.http.delete<Seats>(`${environment.url_ms_cinema}/seats/${id}`);
    }
    view(id:number): Observable<Seats> {
      return this.http.get<Seats>(`${environment.url_ms_cinema}/seats?/${id}`);
    }
    create(newtheater: Seats): Observable<Seats> {
      return this.http.post<Seats>(`${environment.url_ms_cinema}/seats`,newtheater);
    }
    update(thetheater: Seats): Observable<Seats> {
      return this.http.put<Seats>(`${environment.url_ms_cinema}/seats/${thetheater.id}`,thetheater);
    }
}
