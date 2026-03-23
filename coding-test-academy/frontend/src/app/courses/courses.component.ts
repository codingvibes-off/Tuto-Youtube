import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../models/course.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  searchQuery = signal('');

  allCourses: Course[] = [
    {
      id: 1,
      title: 'Selenium WebDriver',
      category: 'Web Testing',
      level: 'Débutant',
      duration: '8h 30min',
      lessons: 24,
      description: 'Maîtrise l\'automatisation web avec Selenium et Java.',
      tags: ['Selenium', 'Java', 'WebDriver']
    },
    {
      id: 2,
      title: 'Cypress E2E Testing',
      category: 'Web Testing',
      level: 'Intermédiaire',
      duration: '6h 15min',
      lessons: 18,
      description: 'Tests end-to-end modernes avec Cypress et JavaScript.',
      tags: ['Cypress', 'JavaScript', 'E2E']
    },
    {
      id: 3,
      title: 'Playwright Avancé',
      category: 'Web Testing',
      level: 'Avancé',
      duration: '10h 00min',
      lessons: 32,
      description: 'Automatisation multi-navigateurs avec Playwright.',
      tags: ['Playwright', 'TypeScript', 'CI/CD']
    },
    {
      id: 4,
      title: 'API Testing avec Postman',
      category: 'API Testing',
      level: 'Débutant',
      duration: '5h 45min',
      lessons: 16,
      description: 'Teste et automatise tes APIs REST avec Postman.',
      tags: ['Postman', 'REST', 'API']
    },
    {
      id: 5,
      title: 'JUnit 5 & TestNG',
      category: 'Unit Testing',
      level: 'Intermédiaire',
      duration: '7h 20min',
      lessons: 22,
      description: 'Frameworks de tests unitaires pour Java.',
      tags: ['JUnit', 'TestNG', 'Java']
    },
    {
      id: 6,
      title: 'CI/CD avec Jenkins',
      category: 'DevOps',
      level: 'Avancé',
      duration: '9h 10min',
      lessons: 28,
      description: 'Intègre tes tests dans un pipeline Jenkins.',
      tags: ['Jenkins', 'CI/CD', 'Docker']
    },
    {
      id: 7,
      title: 'Robot Framework',
      category: 'Automation',
      level: 'Débutant',
      duration: '6h 00min',
      lessons: 20,
      description: 'Automatisation keyword-driven avec Robot Framework.',
      tags: ['Robot', 'Python', 'Keywords']
    },
    {
      id: 8,
      title: 'Performance avec JMeter',
      category: 'Performance',
      level: 'Intermédiaire',
      duration: '8h 00min',
      lessons: 26,
      description: 'Tests de charge et performance avec JMeter.',
      tags: ['JMeter', 'Load Testing', 'Performance']
    },
    {
      id: 9,
      title: 'BDD avec Cucumber',
      category: 'BDD',
      level: 'Intermédiaire',
      duration: '7h 30min',
      lessons: 21,
      description: 'Behavior Driven Development avec Cucumber et Gherkin.',
      tags: ['Cucumber', 'Gherkin', 'BDD']
    },
  ];

  filteredCourses = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allCourses;
    return this.allCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.level.toLowerCase().includes(q)
    );
  });

  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  levelClass(level: string): string {
    return {
      'Débutant': 'badge--beginner',
      'Intermédiaire': 'badge--intermediate',
      'Avancé': 'badge--advanced',
    }[level] ?? '';
  }

  trackById(_: number, course: Course) {
    return course.id;
  }
  content_courses(){
    console.log("CLICK COURSES")
  }
}
