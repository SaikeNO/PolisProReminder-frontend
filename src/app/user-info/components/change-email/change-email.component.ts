import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { UserService } from '../../../shared/data-access/user.service';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { AuthService } from '../../../shared/data-access/auth.service';

@Component({
  selector: 'app-change-email',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss',
})
export class ChangeEmailComponent {
  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private _snackBarService = inject(SnackBarService);
  public dialogRef = inject(MatDialogRef<ChangeEmailComponent>);

  form = this._formBuilder.group({
    newEmail: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this._userService.user$.pipe(filter((user) => !!user)).subscribe((user) => {
      this.form.patchValue({
        newEmail: user.email,
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this._authService
      .changeEmail({
        newEmail: this.form.value.newEmail!,
      })
      .subscribe(() => {
        this.dialogRef.close();
        this._snackBarService.openSucces(
          'Na podany adres e-mail został wysłany link do potwierdzenia zmiany adresu e-mail.',
          10000,
        );
      });
  }
}
