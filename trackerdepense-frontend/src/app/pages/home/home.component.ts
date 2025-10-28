import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class HomeComponent {
mobileMenuOpen = false;

  features = [
    {
      icon: '📈',
      title: 'Gestion des dépenses',
      root: '/expenses',
      description: 'Suivez et analysez chaque euro dépensé avec une précision millimétrique',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🧠',
      title: 'Assistant IA',
      root: '/ia-assistant',
      description: 'Obtenez des conseils personnalisés et des prévisions intelligentes',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: '📊',
      title: 'Visualisations avancées',
      root: '/dashboard',
      description: 'Des graphiques interactifs pour comprendre vos finances en un coup d\'œil',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: '⚡',
      title: 'Catégorisation auto',
      root: '/auto-categorization',
      description: 'L\'IA classe vos dépenses automatiquement pour gagner du temps',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: '🛡️',
      title: 'Sécurité maximale',
      root: '/security',
      description: 'Vos données financières protégées avec un chiffrement de bout en bout',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '✨',
      title: 'Interface intuitive',
      root: '/intuitive-ui',
      description: 'Une expérience utilisateur fluide et moderne qui fait la différence',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  constructor(private router: Router) {}
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
   scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.mobileMenuOpen = false;
  }
}