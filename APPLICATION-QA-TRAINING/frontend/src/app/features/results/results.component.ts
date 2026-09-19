import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Flight, Hotel } from '../../core/models/models';

type Tab = 'all' | 'flights' | 'hotels';
type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  readonly MIN_TRAVELERS = 1;
  readonly MAX_TRAVELERS = 9;

  destination = '';
  departDate = '';
  returnDate = '';
  travelers = 1;

  tab: Tab = 'all';
  maxPrice = 2000;
  minRating = 0;
  sort: SortOption = 'recommended';

  flights: Flight[] = [];
  hotels: Hotel[] = [];
  loading = true;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly catalogService: CatalogService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.destination = params.get('destination') ?? '';
      this.departDate = params.get('departDate') ?? '';
      this.returnDate = params.get('returnDate') ?? '';
      this.travelers = Number(params.get('travelers') ?? 1);
      this.load();
    });
  }

  get travelersInvalid(): boolean {
    return this.travelers < this.MIN_TRAVELERS || this.travelers > this.MAX_TRAVELERS;
  }

  private load(): void {
    if (this.travelersInvalid) {
      this.loading = false;
      this.flights = [];
      this.hotels = [];
      return;
    }

    this.loading = true;
    this.error = '';

    const filters = {
      destination: this.destination || undefined,
      maxPrice: this.maxPrice,
      minRating: this.minRating || undefined,
      sort: this.sort,
    };

    Promise.all([
      this.catalogService.flights(filters).toPromise(),
      this.catalogService.hotels(filters).toPromise(),
    ])
      .then(([flights, hotels]) => {
        this.flights = flights ?? [];
        this.hotels = hotels ?? [];
        this.loading = false;
      })
      .catch(() => {
        this.error = "Impossible de charger les résultats pour le moment.";
        this.loading = false;
      });
  }

  applyFilters(): void {
    this.load();
  }

  resetFilters(): void {
    this.maxPrice = 2000;
    this.minRating = 0;
    this.sort = 'recommended';
    this.load();
  }

  modifySearch(): void {
    this.router.navigate(['/']);
  }

  openFlight(flight: Flight): void {
    this.router.navigate(['/vols', flight.id], { queryParams: { travelers: this.travelers, departDate: this.departDate } });
  }

  openHotel(hotel: Hotel): void {
    this.router.navigate(['/hotels', hotel.id], {
      queryParams: { travelers: this.travelers, checkIn: this.departDate, checkOut: this.returnDate },
    });
  }

  formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m ? m.toString().padStart(2, '0') : ''}`;
  }

  get resultCount(): number {
    if (this.tab === 'flights') return this.flights.length;
    if (this.tab === 'hotels') return this.hotels.length;
    return this.flights.length + this.hotels.length;
  }
}
