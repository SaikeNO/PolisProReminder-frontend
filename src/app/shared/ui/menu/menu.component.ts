import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../data-access/user.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ChangePasswordComponent } from '../../../user-info/components/change-password/change-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, AsyncPipe, RouterLink, MatTooltipModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public user$ = this.userService.user$;

  private dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ChangePasswordComponent, { width: '500px' });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
