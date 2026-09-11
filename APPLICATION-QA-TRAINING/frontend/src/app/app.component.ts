import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    readonly auth: AuthService,
    readonly cart: CartService,
    readonly toast: ToastService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.cart.refresh().subscribe({ error: () => undefined });
    }
  }

  get initials(): string {
    const name = this.auth.currentUser()?.name ?? '';
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    this.cart.clearLocal();
    this.router.navigateByUrl('/');
  }
}
