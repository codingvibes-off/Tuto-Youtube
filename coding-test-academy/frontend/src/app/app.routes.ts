import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
  { path: '', component: GettingStartedComponent },
    { path: 'home', component: HomeComponent },
     { path: 'courses', component: CoursesComponent }
];