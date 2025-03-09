import { Component, inject, WritableSignal, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  step: WritableSignal<number> = signal(1);
  isLoding: WritableSignal<boolean> = signal(false);
  msgErorr: WritableSignal<string> = signal('');
  success: WritableSignal<string> = signal('');

  verifyEmail: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{6}/)]],
  });

  resetPassword: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  verifyEmailSubmit(): void {
    this.isLoding.set(true);
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.success.set(res.message);

          setTimeout(() => {
            this.step.set(2);
            this.success.set('');
          }, 2000);
        }

        this.isLoding.set(false);
        this.msgErorr.set('');
      },
      error: (err) => {
        console.log(err);
        this.msgErorr.set(err.error.message);

        this.isLoding.set(false);
        this.success.set('');
      },
    });
  }

  verifyCodeSubmit(): void {
    this.isLoding.set(true);
    this._authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res, this.resetPassword);
        this.success.set(res.message);

        if (res.status === 'Success') {
          setTimeout(() => {
            this.step.set(3);
            console.log(this.resetPassword.value);
            this.success.set('');
          }, 2000);
        }
        this.msgErorr.set('');

        this.isLoding.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.msgErorr.set(err.error.message);
        this.isLoding.set(false);
        this.success.set('');
      },
    });
  }

  resetPasswordSubmit(): void {
    this.isLoding.set(true);
    this._authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        this.success.set(res.message);
        console.log(res);
        localStorage.setItem('userToken', res.token);

        this._authService.seveUserData();

        setTimeout(() => {
          this._router.navigate(['/home']);
        }, 1500);

        this.isLoding.set(false);
      },
      error: (err) => {
        console.log(err);
        this.msgErorr.set(err.error.message);
        this.isLoding.set(false);
      },
    });
  }
}
