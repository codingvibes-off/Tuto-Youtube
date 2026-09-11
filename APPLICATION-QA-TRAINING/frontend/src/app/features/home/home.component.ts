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

  // BUG_CONNU #2 (voir BUGS_CONNUS.md) : ce compteur "voyageurs" est géré à
  // la main (pas un <input type="number" min="1">) et `decrement()` ne
  // vérifie jamais qu'on reste au-dessus de 1. On peut donc atteindre 0,
  // voire un nombre négatif, et lancer la recherche avec cette valeur :
  // l'API accepte elle aussi 0 voyageur (cf. SearchQueryDto côté backend).
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

  increment(): void {
    this.travelers.update((v) => v + 1);
  }

  decrement(): void {
    this.travelers.update((v) => v - 1);
  }

  search(): void {
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
