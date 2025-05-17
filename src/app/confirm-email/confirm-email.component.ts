import { Component, inject } from '@angular/core';
import { AppLogoComponent } from '../shared/logo/logo.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/data-access/auth.service';
import { UserService } from '../shared/data-access/user.service';
import { SnackBarService } from '../shared/data-access/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-email',
  imports: [AppLogoComponent, RouterLink, MatButtonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  private _route = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _snackBarService = inject(SnackBarService);
  private _router = inject(Router);

  loading = true;
  error: string | null = null;
  success = false;

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      const { userId, code, changedEmail } = params;

      if (!userId || !code) {
        this.error = 'Brak wymaganych parametrów w linku.';
        this.loading = false;
        return;
      }

      this._authService.confirmEmail(userId, code, changedEmail).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this._userService.getUserInfo().subscribe({
            next: () => {
              this._snackBarService.openSucces('Poprawnie zmieniono adres email', 10000);
              this._router.navigate(['/']);
            },
          });
        },
        error: () => {
          this.error = 'Nie udało się potwierdzić adresu email.';
          this.loading = false;
        },
      });
    });
  }
}
