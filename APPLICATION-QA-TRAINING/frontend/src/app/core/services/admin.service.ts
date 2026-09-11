import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminStats, Booking, Offer } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private readonly http: HttpClient) {}

  bookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/admin/bookings');
  }

  stats(): Observable<AdminStats> {
    return this.http.get<AdminStats>('/api/admin/stats');
  }

  offers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('/api/admin/offers');
  }

  createOffer(payload: Partial<Offer>): Observable<Offer> {
    return this.http.post<Offer>('/api/admin/offers', payload);
  }

  updateOffer(id: number, payload: Partial<Offer>): Observable<Offer> {
    return this.http.patch<Offer>(`/api/admin/offers/${id}`, payload);
  }

  deleteOffer(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`/api/admin/offers/${id}`);
  }
}
