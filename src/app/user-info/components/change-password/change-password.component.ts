import { Component, OnDestroy, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordsInterface } from './change-password.models';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/data-access/auth.service';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { PasswordInputComponent } from '../../../shared/ui/password-input/password-input.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    PasswordInputComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnDestroy {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _snackBarService = inject(SnackBarService);
  private _onDestroy$ = new Subject<void>();

  form: FormGroup<PasswordsInterface>;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {
    this.form = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordsMatchValidator()]],
    });
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this._authService
      .changePassword({
        oldPassword: this.form.value.oldPassword!,
        newPassword: this.form.value.newPassword!,
      })
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        this.dialogRef.close();
        this._snackBarService.openSucces('Poprawnie zmieniono hasło');
      });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = this.form?.controls?.newPassword.value;
      const confirmPassword = control.value;
      return newPassword === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
}
