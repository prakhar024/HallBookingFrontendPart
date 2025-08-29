import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hall {
  id?: number;
  name: string;
  location: string;
  capacity: number;
  pricePerDay: number;
}

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = 'http://localhost:8080/api/v1/halls';

  constructor(private http: HttpClient) {}

  getHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(this.apiUrl);
  }

  addHall(hall: Hall): Observable<Hall> {
    return this.http.post<Hall>(this.apiUrl, hall);
  }
}

