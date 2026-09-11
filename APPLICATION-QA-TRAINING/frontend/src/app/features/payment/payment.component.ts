import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { PaymentService } from '../../core/services/payment.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  cardholderName = '';
  cardNumber = '';
  expiry = '';
  cvv = '';
  submitting = false;
  errorMessage = '';

  constructor(
    readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    private readonly toast: ToastService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.refresh().subscribe();
  }

  get formValid(): boolean {
    return (
      this.cardholderName.trim().length > 1 &&
      /^\d{16}$/.test(this.cardNumber.replace(/\s/g, '')) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry) &&
      /^\d{3}$/.test(this.cvv)
    );
  }

  pay(): void {
    if (!this.formValid || this.cartService.items().length === 0) return;

    this.submitting = true;
    this.errorMessage = '';

    this.paymentService
      .checkout({
        cardholderName: this.cardholderName,
        cardNumber: this.cardNumber.replace(/\s/g, ''),
        expiry: this.expiry,
        cvv: this.cvv,
      })
      .subscribe({
        next: (result) => {
          this.submitting = false;
          if (result.success) {
            this.cartService.clearLocal();
            this.toast.show('Paiement accepté !', 'success');
            this.router.navigate(['/confirmation', result.booking.reference]);
          } else {
            // BUG_CONNU #3 (voir BUGS_CONNUS.md) : le backend renvoie un
            // `errorCode` et un `message` précis (carte expirée, carte
            // refusée...) mais ils sont ignorés ici : on affiche toujours le
            // même message générique, quelle que soit la vraie cause du
            // refus.
            this.errorMessage = 'Une erreur est survenue lors du paiement. Veuillez réessayer.';
          }
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'Une erreur est survenue lors du paiement. Veuillez réessayer.';
        },
      });
  }
}
