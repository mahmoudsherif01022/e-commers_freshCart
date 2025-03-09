import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  isLoding: WritableSignal<boolean> = signal(false);
  msgErorr: WritableSignal<string> = signal('');
  success: WritableSignal<string> = signal('');

  registerForm: FormGroup = this._formBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
      ],
      rePassword: [null],
      phone: [
        null,
        [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required],
      ],
    },
    { validators: this.confirmpassword }
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z]\w{7,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [Validators.required]),
  //     phone: new FormControl(null, [
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //       Validators.required,
  //     ]),
  //   },
  //   { validators: this.confirmpassword }
  // );

  sumbitForm(): void {
    if (this.registerForm.valid) {
      this.isLoding.set(true);
      console.log(this.registerForm.value);

      this._authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 700);

            this.success.set(res.message);
          }
          this.isLoding.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgErorr.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmpassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }
}
