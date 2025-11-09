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
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
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
export class OtpComponent {
 otpForm: any;
    constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }
  
    ngOnInit(): void {
      this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    })
  }
  get otp() {
    return this.otpForm.controls['otp'];
  }
    get email() {
    return this.otpForm.controls['email'];
  }
  sendOtpCode() {
    const otpCode: number = this.otpForm.value.otp;
    const email: String = this.otpForm.value.email;
    this.authService.sendOtpCode(otpCode, email).subscribe( 
      response=> {
        console.log(response);
        if(!response.success) {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        } else {
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'OTP code sent successfully' });
          if(response.token)
            this.authService.registredToken(response.token);
          this.router.navigate(['/home']);
        }
       
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }

    )
  }
}
