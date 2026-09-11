import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Flight } from '../../core/models/models';

@Component({
  selector: 'app-flight-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './flight-detail.component.html',
  styleUrl: './detail.component.scss',
})
export class FlightDetailComponent implements OnInit {
  flight: Flight | null = null;
  loading = true;
  travelers = 1;
  departDate = new Date().toISOString().slice(0, 10);
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
    this.departDate = this.route.snapshot.queryParamMap.get('departDate') || this.departDate;

    this.catalogService.flight(id).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addToCart(): void {
    if (!this.flight) return;

    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/connexion'], { queryParams: { redirect: this.router.url } });
      return;
    }

    this.adding = true;
    this.cartService
      .add({ type: 'FLIGHT', refId: this.flight.id, travelers: this.travelers, startDate: this.departDate })
      .subscribe({
        next: () => {
          this.adding = false;
          this.toast.show('Vol ajouté à votre panier.', 'success');
        },
        error: () => {
          this.adding = false;
          this.toast.show("Impossible d'ajouter ce vol au panier.", 'error');
        },
      });
  }
}
