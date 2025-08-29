import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Booking {
  hallId: number;
  userId: number;
  bookingDate: string;
  customerName: string;
  customerPhone: string;
  eventDate: string;
  status?: string;
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/v1/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking);
  }


  deleteBooking(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}


