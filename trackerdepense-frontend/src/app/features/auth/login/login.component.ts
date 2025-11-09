import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../users/models/user.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule,
      CommonModule,
      ReactiveFormsModule,
      CardModule,
      ButtonModule,
      ToastModule
    ],
    providers: [MessageService]
})
export class LoginComponent {
    loginForm: any;
    constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }
  ngOnInit(): void {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }
  loginUser() {
    const user: User = this.loginForm.value as User;
    this.authService.loginUser(user).subscribe(
      response => {
        if (response.accessToken) {
          this.authService.registredToken(response.accessToken);
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'email or password is wrong' });
        }
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }

    )
  }
}