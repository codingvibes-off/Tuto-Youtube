import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingsService } from '../../core/services/bookings.service';
import { Booking } from '../../core/models/models';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  loading = true;
  reference = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookingsService: BookingsService,
  ) {}

  ngOnInit(): void {
    this.reference = this.route.snapshot.paramMap.get('reference') ?? '';
    this.bookingsService.list().subscribe({
      next: (bookings) => {
        this.booking = bookings.find((b) => b.reference === this.reference) ?? null;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
