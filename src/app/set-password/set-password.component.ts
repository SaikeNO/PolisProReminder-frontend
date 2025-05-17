import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PasswordInputComponent } from '../shared/ui/password-input/password-input.component';
import { AuthService } from '../shared/data-access/auth.service';
import { MatCardModule } from '@angular/material/card';
import { AppLogoComponent } from '../shared/logo/logo.component';
import { SnackBarService } from '../shared/data-access/snack-bar.service';

@Component({
  selector: 'app-set-password',
  standalone: true,
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    PasswordInputComponent,
    MatCardModule,
    AppLogoComponent,
  ],
})
export class SetPasswordComponent implements OnInit {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _snackBarService = inject(SnackBarService);

  form = this._formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.passwordsMatchValidator()]],
  });

  loading = true;
  error: string | null = null;
  email = '';
  resetCode = '';
  userId = '';
  emailConfirmationCode = '';
  confirmed = false;

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.email = params['userEmail'];
      this.resetCode = params['passwordResetCode'];
      this.emailConfirmationCode = params['emailConfirmationCode'];

      if (!this.userId || !this.emailConfirmationCode) {
        this.error = 'Brak wymaganych parametrów w linku.';
        this.loading = false;
        return;
      }

      this._authService.confirmEmail(this.userId, this.emailConfirmationCode).subscribe({
        next: () => {
          this.confirmed = true;
          this.loading = false;
        },
        error: () => {
          this.error = 'Nie udało się potwierdzić adresu email.';
          this.loading = false;
        },
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this._authService
      .resetPassword(this.email, this.resetCode, this.form.value.newPassword!)
      .subscribe({
        next: () => {
          this._snackBarService.openSucces('Hasło zostało ustawione. Możesz się zalogować.');
          this._router.navigate(['/login']);
        },
        error: () => {
          this._snackBarService.openFailure('Nie udało się ustawić hasła.');
        },
      });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = this.form?.controls?.newPassword.value;
      const confirm = control.value;
      return pass === confirm ? null : { passwordsMismatch: true };
    };
  }
}
