import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../shared/data-access/user.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AssistantsComponent } from '../home/components/assistants/assistants.component';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../shared/ui/change-password/change-password.component';
import { EditUserInfoComponent } from '../shared/ui/edit-user-info/edit-user-info.component';

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

  openEditUserInfoDialog(): void {
    this.dialog.open(EditUserInfoComponent, { width: '500px' });
  }
}
