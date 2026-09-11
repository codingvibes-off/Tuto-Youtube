import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination, Flight, Hotel, HotelReview } from '../models/models';

export interface SearchFilters {
  destination?: string;
  destinationId?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private readonly http: HttpClient) {}

  private toParams(filters: SearchFilters): HttpParams {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

  destinations(query?: string): Observable<Destination[]> {
    const params = query ? new HttpParams().set('query', query) : undefined;
    return this.http.get<Destination[]>('/api/catalog/destinations', { params });
  }

  destination(slug: string): Observable<Destination> {
    return this.http.get<Destination>(`/api/catalog/destinations/${slug}`);
  }

  flights(filters: SearchFilters): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/catalog/flights', { params: this.toParams(filters) });
  }

  flight(id: number): Observable<Flight> {
    return this.http.get<Flight>(`/api/catalog/flights/${id}`);
  }

  hotels(filters: SearchFilters): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('/api/catalog/hotels', { params: this.toParams(filters) });
  }

  hotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`/api/catalog/hotels/${id}`);
  }

  reviews(hotelId: number): Observable<HotelReview[]> {
    return this.http.get<HotelReview[]>(`/api/catalog/hotels/${hotelId}/reviews`);
  }
}
