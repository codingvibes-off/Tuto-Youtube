import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Hotel, HotelReview } from '../../core/models/models';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './detail.component.scss',
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  reviews: HotelReview[] = [];
  loading = true;
  travelers = 1;
  checkIn = new Date().toISOString().slice(0, 10);
  checkOut = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  adding = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly catalogService: CatalogService,
    private readonly cartService: CartService,
    private readonly auth: AuthService,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.travelers = Number(this.route.snapshot.queryParamMap.get('travelers') ?? 1);
    this.checkIn = this.route.snapshot.queryParamMap.get('checkIn') || this.checkIn;
    this.checkOut = this.route.snapshot.queryParamMap.get('checkOut') || this.checkOut;

    this.catalogService.hotel(id).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });

    this.catalogService.reviews(id).subscribe({ next: (reviews) => (this.reviews = reviews) });
  }

  get nights(): number {
    const diff = new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  }

  addToCart(): void {
    if (!this.hotel) return;

    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/connexion'], { queryParams: { redirect: this.router.url } });
      return;
    }

    this.adding = true;
    this.cartService
      .add({
        type: 'HOTEL',
        refId: this.hotel.id,
        travelers: this.travelers,
        startDate: this.checkIn,
        endDate: this.checkOut,
      })
      .subscribe({
        next: () => {
          this.adding = false;
          this.toast.show('Hôtel ajouté à votre panier.', 'success');
        },
        error: () => {
          this.adding = false;
          this.toast.show("Impossible d'ajouter cet hôtel au panier.", 'error');
        },
      });
  }
}
