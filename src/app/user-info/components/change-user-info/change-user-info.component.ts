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

@Component({
  selector: 'app-change-user-info',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.scss'],
})
export class ChangeUserInfoComponent {
  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _snackBarService = inject(SnackBarService);
  public dialogRef = inject(MatDialogRef<ChangeUserInfoComponent>);

  form = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor() {
    this._userService.user$.pipe(filter((user) => !!user)).subscribe((user) => {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this._userService
      .updateUserInfo({
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
      })
      .subscribe(() => {
        this.dialogRef.close();
        this._snackBarService.openSucces('Informacje zostały zaktualizowane.');
      });
  }
}
