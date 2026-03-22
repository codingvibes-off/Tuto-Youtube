import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { QuizzCoursesComponent } from './quizz-courses/quizz-courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quizz-question', component: QuizzCoursesComponent },
  { path: 'courses', component: CoursesComponent }
];