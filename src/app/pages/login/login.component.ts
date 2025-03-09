import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  isLoding: WritableSignal<boolean> = signal(false);
  msgErorr: WritableSignal<string> = signal('');
  success: WritableSignal<string> = signal('');
  text: WritableSignal<string> = signal('');

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z]\w{7,}$/),
  //   ]),
  // });

  sumbitForm(): void {
    if (this.loginForm.valid) {
      this.isLoding.set(true);
      this._authService.sendloginrForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.success.set(res.message);
            setTimeout(() => {
              // 1- seve tokne
              localStorage.setItem('userToken', res.token);
              this._authService.seveUserData();

              this._router.navigate(['/home']);
            }, 1000);
          }
          this.isLoding.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgErorr.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    }
  }
}
