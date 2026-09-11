import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { CartItem } from '../../core/models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  loading = true;
  promoInput = '';
  promoError = '';

  constructor(
    readonly cartService: CartService,
    private readonly toast: ToastService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.refresh().subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }

  updateTravelers(item: CartItem, travelers: number): void {
    if (travelers < 1) return;
    this.cartService.updateTravelers(item.id, travelers).subscribe({
      error: () => this.toast.show('Impossible de mettre à jour ce voyage.', 'error'),
    });
  }

  remove(item: CartItem): void {
    this.cartService.remove(item.id).subscribe({
      next: () => this.toast.show('Voyage retiré du panier.', 'info'),
      error: () => this.toast.show('Impossible de retirer ce voyage.', 'error'),
    });
  }

  applyPromoCode(): void {
    this.promoError = '';
    if (!this.promoInput.trim()) return;

    const applied = this.cartService.applyPromoCode(this.promoInput);
    if (!applied) {
      this.promoError = 'Ce code promo est invalide ou a expiré.';
      return;
    }
    this.toast.show(`Code "${this.cartService.promoCode()}" appliqué !`, 'success');
    this.promoInput = '';
  }

  removePromoCode(): void {
    this.cartService.removePromoCode();
  }

  goToPayment(): void {
    this.router.navigateByUrl('/paiement');
  }
}
