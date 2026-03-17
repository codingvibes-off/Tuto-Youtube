import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navLinks = [
    { label: 'Accueil', active: true },
    { label: 'Cours', active: false },
    { label: 'Bibliothèque', active: false },
    { label: 'Emploi', active: false },
    { label: 'Certification', active: false },
    { label: 'QCM', active: false },
  ];

  mobileMenuOpen = false;

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
