import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { ToastService } from '../../core/services/toast.service';
import { AdminStats, Booking, Offer } from '../../core/models/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  tab: 'bookings' | 'offers' = 'bookings';
  stats: AdminStats | null = null;
  bookings: Booking[] = [];
  offers: Offer[] = [];
  loading = true;

  newOffer = { title: '', description: '', discountPercent: 10 };
  creatingOffer = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    Promise.all([
      this.adminService.stats().toPromise(),
      this.adminService.bookings().toPromise(),
      this.adminService.offers().toPromise(),
    ]).then(([stats, bookings, offers]) => {
      this.stats = stats ?? null;
      this.bookings = bookings ?? [];
      this.offers = offers ?? [];
      this.loading = false;
    });
  }

  createOffer(): void {
    if (!this.newOffer.title.trim() || !this.newOffer.description.trim()) return;

    this.creatingOffer = true;
    this.adminService.createOffer(this.newOffer).subscribe({
      next: (offer) => {
        this.offers = [offer, ...this.offers];
        this.newOffer = { title: '', description: '', discountPercent: 10 };
        this.creatingOffer = false;
        this.toast.show('Offre créée.', 'success');
      },
      error: () => {
        this.creatingOffer = false;
        this.toast.show("Impossible de créer l'offre.", 'error');
      },
    });
  }

  toggleOffer(offer: Offer): void {
    this.adminService.updateOffer(offer.id, { active: !offer.active }).subscribe({
      next: (updated) => (this.offers = this.offers.map((o) => (o.id === updated.id ? updated : o))),
      error: () => this.toast.show('Impossible de mettre à jour cette offre.', 'error'),
    });
  }

  deleteOffer(offer: Offer): void {
    this.adminService.deleteOffer(offer.id).subscribe({
      next: () => (this.offers = this.offers.filter((o) => o.id !== offer.id)),
      error: () => this.toast.show("Impossible de supprimer l'offre.", 'error'),
    });
  }
}
