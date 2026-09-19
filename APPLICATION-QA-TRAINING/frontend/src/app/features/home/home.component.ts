import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Destination } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  destination = '';
  departDate = this.defaultDepart();
  returnDate = this.defaultReturn();

  // Règle métier : entre 1 et 9 voyageurs par recherche (BUG_CONNU #2 fixé
  // côté front ; le backend applique la même borne dans SearchQueryDto).
  readonly MIN_TRAVELERS = 1;
  readonly MAX_TRAVELERS = 9;
  travelers = signal(2);

  popularDestinations: Destination[] = [];
  loadingDestinations = true;

  constructor(
    private readonly catalogService: CatalogService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.catalogService.destinations().subscribe({
      next: (destinations) => {
        this.popularDestinations = destinations.filter((d) => d.popular);
        this.loadingDestinations = false;
      },
      error: () => (this.loadingDestinations = false),
    });
  }

  private defaultDepart(): string {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().slice(0, 10);
  }

  private defaultReturn(): string {
    const d = new Date();
    d.setDate(d.getDate() + 28);
    return d.toISOString().slice(0, 10);
  }

  get travelersInvalid(): boolean {
    return this.travelers() < this.MIN_TRAVELERS || this.travelers() > this.MAX_TRAVELERS;
  }

  increment(): void {
    this.travelers.update((v) => v + 1);
  }

  decrement(): void {
    this.travelers.update((v) => Math.max(0, v - 1));
  }

  setTravelers(value: number): void {
    this.travelers.set(Number.isFinite(value) ? value : 0);
  }

  search(): void {
    if (this.travelersInvalid) {
      return;
    }

    this.router.navigate(['/resultats'], {
      queryParams: {
        destination: this.destination || undefined,
        departDate: this.departDate,
        returnDate: this.returnDate,
        travelers: this.travelers(),
      },
    });
  }

  searchDestination(city: string): void {
    this.destination = city;
    this.search();
  }
}
