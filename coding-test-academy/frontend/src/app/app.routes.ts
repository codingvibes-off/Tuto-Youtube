import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { QuizzCoursesComponent } from './quizz-courses/quizz-courses.component';
import { ContentCoursesComponent } from './content-courses/content-courses.component';
import { LibraryComponent } from './library/library.component';
import { JobsComponent } from './jobs/jobs.component';
import { CertificationComponent } from './certification/certification.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quizz-courses', component: QuizzCoursesComponent },
  { path: 'courses', component: CoursesComponent },
   { path: 'content-courses/:title', component: ContentCoursesComponent },
  { path: 'library', component: LibraryComponent },
    { path: 'certification', component: CertificationComponent },
  { path: 'jobs', component: JobsComponent },
  ];