import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './auth.component.scss',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  submitting = false;
  errorMessage = '';
  private redirect = '/compte';

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.redirect = this.route.snapshot.queryParamMap.get('redirect') ?? '/compte';
  }

  submit(): void {
    if (!this.email || !this.password) return;

    this.submitting = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.submitting = false;
        this.cartService.refresh().subscribe();
        this.toast.show('Content de vous revoir !', 'success');
        this.router.navigateByUrl(this.redirect);
      },
      error: (err) => {
        this.submitting = false;
        // Ici, contrairement à l'inscription, le message précis renvoyé par
        // l'API est bien affiché (compte inexistant vs mot de passe
        // incorrect) : c'est volontaire, pour contraster avec BUG_CONNU #1.
        this.errorMessage = err?.error?.message ?? 'Impossible de vous connecter pour le moment.';
      },
    });
  }
}
