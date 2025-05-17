import { Component, inject } from '@angular/core';
import { UserService } from '../shared/data-access/user.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AssistantsComponent } from '../assistants/assistants.component';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUserInfoComponent } from './components/change-user-info/change-user-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    AssistantsComponent,
    MatListModule,
    MatDivider,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  public user$ = this.userService.user$;

  openDialog(): void {
    this.dialog.open(ChangePasswordComponent, { width: '500px' });
  }

  openChangeUserInfoDialog(): void {
    this.dialog.open(ChangeUserInfoComponent, { width: '500px' });
  }

  openChangeEmailDialog(): void {
    this.dialog.open(ChangeEmailComponent, { width: '500px' });
  }
}
