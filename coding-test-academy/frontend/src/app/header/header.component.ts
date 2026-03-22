import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navLinks = [
    { root:"/home",  label: 'Accueil', active: true },
    { root:"/courses", label: 'Cours', active: false },
    { root:"/", label: 'Bibliothèque', active: false },
    { root:"/jobs", label: 'Emploi', active: false },
    { root:"/certification", label: 'Certification', active: false },
    { root:"/quizz-question", label: 'QCM', active: false },
  ];

  mobileMenuOpen = false;

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
