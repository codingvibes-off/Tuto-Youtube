import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './auth.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';
  submitting = false;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly toast: ToastService,
    private readonly router: Router,
  ) {}

  // BUG_CONNU #1 (voir BUGS_CONNUS.md) : seule règle appliquée ici, "6
  // caractères minimum" — identique au texte d'aide affiché dans le
  // template. Le backend (RegisterDto) exige lui 8 caractères ET au moins
  // un chiffre. Un mot de passe comme "azertyu" (7 lettres, pas de chiffre)
  // passe donc cette validation front mais sera rejeté par l'API.
  get passwordValid(): boolean {
    return this.password.length >= 6;
  }

  get formValid(): boolean {
    return this.email.includes('@') && this.passwordValid && this.name.trim().length >= 2;
  }

  submit(): void {
    if (!this.formValid) return;

    this.submitting = true;
    this.errorMessage = '';

    this.authService.register({ email: this.email, password: this.password, name: this.name }).subscribe({
      next: () => {
        this.submitting = false;
        this.toast.show(`Bienvenue chez Voyago, ${this.name.split(' ')[0]} !`, 'success');
        this.router.navigateByUrl('/compte');
      },
      error: () => {
        // BUG_CONNU #1 (suite) : le backend renvoie souvent un message très
        // précis (ex. "Le mot de passe doit contenir au moins un chiffre."),
        // mais il n'est jamais lu ici (`err.error.message` est ignoré) : on
        // affiche systématiquement ce texte générique, quelle que soit la
        // cause réelle de l'échec (email déjà utilisé, mot de passe trop
        // court, etc.).
        this.submitting = false;
        this.errorMessage = "Erreur lors de l'inscription. Veuillez réessayer.";
      },
    });
  }
}
