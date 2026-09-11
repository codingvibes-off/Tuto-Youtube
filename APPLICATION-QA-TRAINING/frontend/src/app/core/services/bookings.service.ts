import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings');
  }

  get(id: number): Observable<Booking> {
    return this.http.get<Booking>(`/api/bookings/${id}`);
  }

  cancel(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`/api/bookings/${id}/cancel`, {});
  }
}
