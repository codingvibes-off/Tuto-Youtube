import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from '../courses/courses.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navLinks = [
    { root:"/home",  label: 'Accueil', active: false },
    { root:"/courses", label: 'Cours', active: false },
    { root:"/library", label: 'Bibliothèque', active: false },
    { root:"/jobs", label: 'Emploi', active: false },
    { root:"/certification", label: 'Certification', active: false },
    { root:"/quizz-courses", label: 'QCM', active: false },
  ];
   constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLink(event.url);
      }
    });
  }
  mobileMenuOpen = false;
  setActiveLink(currentUrl: string) {
    this.navLinks.forEach(link => {
      link.active = currentUrl.startsWith(link.root);
    });
  }
  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
