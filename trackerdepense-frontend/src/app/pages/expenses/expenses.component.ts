import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { ExpenseCreateComponent } from '../../features/expense/expense-create/expense-create.component';

@Component({
  standalone: true,
  selector: 'app-expenses',
  imports: [HeaderComponent, CommonModule, ExpenseCreateComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {

}
