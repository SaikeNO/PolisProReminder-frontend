import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../data-access/user.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private userService = inject(UserService);
  public user$ = this.userService.user$;

  private dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ChangePasswordComponent, { maxWidth: 500 });
  }
}
