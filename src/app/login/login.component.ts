import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PasswordInputComponent } from '../shared/ui/password-input/password-input.component';
import { LoginModel } from './login.models';
import { Credentials } from '../shared/interfaces/auth';
import { SnackBarService } from '../shared/data-access/snack-bar.service';
import { UserService } from '../shared/data-access/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    PasswordInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _router = inject(Router);
  private _snackBarService = inject(SnackBarService);

  loginForm: FormGroup<LoginModel> = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.clearErrors();
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this._authService
      .login(this.loginForm.value as Credentials)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loginForm.controls.email.setErrors({ inncorrect: true });
          this.loginForm.controls.password.setErrors({ inncorrect: true });
          this._snackBarService.openFailure('Błędny login lub hasło');
          return throwError(() => err);
        }),
      )
      .subscribe(() => {
        this._userService.getUserInfo().subscribe(() => {
          this._router.navigate(['/']);
        });
      });
  }

  private clearErrors() {
    this.loginForm.controls.email.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
  }
}
