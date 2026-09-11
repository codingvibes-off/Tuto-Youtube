import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentResponse } from '../models/models';

export interface ChargePayload {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private readonly http: HttpClient) {}

  checkout(payload: ChargePayload): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>('/api/payment/checkout', payload);
  }
}
