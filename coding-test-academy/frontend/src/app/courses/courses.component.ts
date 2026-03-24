import { Component, signal, computed } from '@angular/core';
import { Course } from '../models/course.model';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { COURSE_LIST } from './course-list/course-list';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(private router:Router){}
  searchQuery = signal('');

  allCourses: Course[] = COURSE_LIST
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
  go_to_content_courses(title_courses: string) {
    const formattedTitle = title_courses
      .toLowerCase()
      .replace(/\s+/g, '_'); 

    this.router.navigate(['/content-courses', formattedTitle]);
  }

}
