import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryListComponent } from './features/categories/pages/category-list/category-list.component';
import { CategoryDetailComponent } from './features/categories/pages/category-detail/category-detail.component';
import { CategoryCreateComponent } from './features/categories/pages/category-create/category-create.component';
import { CategoryEditComponent } from './features/categories/pages/category-edit/category-edit.component';
import {AuthGuard} from './core/guards/auth.guard';
import { OtpComponent } from './features/auth/otp/otp.component';
import { ExpenseCreateComponent } from './features/expense/expense-create/expense-create.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ExpenseEditComponent } from './features/expense/expense-edit/expense-edit.component';
import { ExpenseDetailComponent } from './features/expense/expense-detail/expense-detail.component';
// ...existing code...
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
      path: 'categories',
      canActivate: [AuthGuard],
      children: [
        { path: '', component: CategoryListComponent, canActivate: [AuthGuard]  },
        { path: 'create', component: CategoryCreateComponent , canActivate: [AuthGuard] },
        { path: ':id/edit', component: CategoryEditComponent, canActivate: [AuthGuard]  },
        { path: ':id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
      ]
    },
     {
      path: 'expenses',
      canActivate: [AuthGuard],
      children: [
        { path: '', component: ExpensesComponent, canActivate: [AuthGuard]  },
        { path: 'create', component: ExpenseCreateComponent , canActivate: [AuthGuard] },
        { path: ':id/edit', component: ExpenseEditComponent, canActivate: [AuthGuard]  },
        { path: ':id', component: ExpenseDetailComponent, canActivate: [AuthGuard] },
      ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];