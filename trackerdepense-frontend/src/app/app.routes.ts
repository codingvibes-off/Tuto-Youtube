import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { CategoryListComponent } from './features/categories/pages/category-list/category-list.component';
import { CategoryDetailComponent } from './features/categories/pages/category-detail/category-detail.component';
import { CategoryCreateComponent } from './features/categories/pages/category-create/category-create.component';
import { CategoryEditComponent } from './features/categories/pages/category-edit/category-edit.component';
import {AuthGuard} from './core/guards/auth.guard';
// ...existing code...
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
      path: 'categories',
      canActivate: [AuthGuard],
      children: [
        { path: '', component: CategoryListComponent },
        { path: 'create', component: CategoryCreateComponent },
        { path: ':id/edit', component: CategoryEditComponent },
        { path: ':id', component: CategoryDetailComponent },
      ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];