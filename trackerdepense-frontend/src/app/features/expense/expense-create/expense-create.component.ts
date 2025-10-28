import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  providers: [MessageService]
})
export class ExpenseCreateComponent implements OnInit {
  expenseForm!: FormGroup;
  isSubmitting = false;
  categories = [
  { name: 'Restauration', icon: 'assets/categories/food.png', value: 'food' },
  { name: 'Transport', icon: 'assets/categories/transport.png', value: 'transport' },
  { name: 'Logement', icon: 'assets/categories/home.png', value: 'home' },
  { name: 'Divertissement', icon: 'assets/categories/entertainment.png', value: 'entertainment' },
  { name: 'Shopping', icon: 'assets/categories/shopping.png', value: 'shopping' },
  { name: 'Santé', icon: 'assets/categories/health.png', value: 'health' }
];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private msgService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      category: [''],
      description: ['']
    });
  }

  /** Accès rapide aux contrôles pour le template HTML */
  get title() {
    return this.expenseForm.get('title')!;
  }
  get amount() {
    return this.expenseForm.get('amount')!;
  }
  get date() {
    return this.expenseForm.get('date')!;
  }

  /** Méthode principale pour créer une dépense */
  createExpense(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.expenseService.createExpense(this.expenseForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.msgService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Dépense créée avec succès ✅'
        });
        this.expenseForm.reset();
        setTimeout(() => this.router.navigate(['/expenses']), 1000);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erreur création dépense :', err);
        this.msgService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de créer la dépense ❌'
        });
      }
    });
  }
}
