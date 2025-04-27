import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../data-access/user.service';
import { SnackBarService } from '../../data-access/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-edit-user-info',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
})
export class EditUserInfoComponent {
  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _snackBarService = inject(SnackBarService);
  public dialogRef = inject(MatDialogRef<EditUserInfoComponent>);

  form = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this._userService.user$.pipe(filter((user) => !!user)).subscribe((user) => {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this._userService
      .updateUserInfo({
        email: this.form.value.email!,
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
      })
      .subscribe(() => {
        this.dialogRef.close();
        this._snackBarService.openSucces('Informacje zostały zaktualizowane.');
      });
  }
}
