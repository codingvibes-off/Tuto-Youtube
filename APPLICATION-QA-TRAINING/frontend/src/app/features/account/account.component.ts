import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BookingsService } from '../../core/services/bookings.service';
import { ToastService } from '../../core/services/toast.service';
import { Booking } from '../../core/models/models';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  cancellingId: number | null = null;

  constructor(
    readonly auth: AuthService,
    private readonly bookingsService: BookingsService,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.bookingsService.list().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  get upcomingCount(): number {
    return this.bookings.filter((b) => b.status === 'CONFIRMED').length;
  }

  cancel(booking: Booking): void {
    this.cancellingId = booking.id;
    this.bookingsService.cancel(booking.id).subscribe({
      next: (updated) => {
        this.bookings = this.bookings.map((b) => (b.id === updated.id ? updated : b));
        this.cancellingId = null;
        this.toast.show('Réservation annulée.', 'info');
      },
      error: () => {
        this.cancellingId = null;
        this.toast.show("Impossible d'annuler cette réservation.", 'error');
      },
    });
  }

  editProfile(): void {
    this.toast.show('La modification du profil arrive bientôt.', 'info');
  }
}
