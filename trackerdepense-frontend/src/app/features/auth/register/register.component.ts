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
import { passwordMatchValidator } from '../../../shared/directives/passsword-match.directive';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule,
      CommonModule,
      ReactiveFormsModule,
      CardModule,
      ButtonModule,
      ToastModule
    ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private notyf = new Notyf();
  registerForm: any;
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    })
  }

  get name() {
    return this.registerForm.controls['name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.notyf.success('Subscription successful! An OTP has been sent to your email.!');
        this.router.navigate(['login'])
      },
      error => {
         this.notyf.error('SomeThing went wrong!');
      }
    )
  }

}