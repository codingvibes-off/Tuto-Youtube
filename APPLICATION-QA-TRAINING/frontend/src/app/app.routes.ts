import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Voyago — Le prochain voyage commence ici',
  },
  {
    path: 'resultats',
    loadComponent: () => import('./features/results/results.component').then((m) => m.ResultsComponent),
    title: 'Voyago — Résultats de recherche',
  },
  {
    path: 'vols/:id',
    loadComponent: () => import('./features/detail/flight-detail.component').then((m) => m.FlightDetailComponent),
    title: 'Voyago — Détail du vol',
  },
  {
    path: 'hotels/:id',
    loadComponent: () => import('./features/detail/hotel-detail.component').then((m) => m.HotelDetailComponent),
    title: 'Voyago — Détail de l\'hôtel',
  },
  {
    path: 'inscription',
    loadComponent: () => import('./features/auth/register.component').then((m) => m.RegisterComponent),
    title: 'Voyago — Créer un compte',
  },
  {
    path: 'connexion',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
    title: 'Voyago — Connexion',
  },
  {
    path: 'panier',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'Voyago — Mon panier',
  },
  {
    path: 'paiement',
    canActivate: [authGuard],
    loadComponent: () => import('./features/payment/payment.component').then((m) => m.PaymentComponent),
    title: 'Voyago — Paiement',
  },
  {
    path: 'confirmation/:reference',
    canActivate: [authGuard],
    loadComponent: () => import('./features/confirmation/confirmation.component').then((m) => m.ConfirmationComponent),
    title: 'Voyago — Réservation confirmée',
  },
  {
    path: 'compte',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account.component').then((m) => m.AccountComponent),
    title: 'Voyago — Mon espace',
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent),
    title: 'Voyago — Console admin',
  },
  { path: '**', redirectTo: '' },
];
