import { Component, inject } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../data-access/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public userSerivce = inject(UserService);
  public user$ = this.userSerivce.user$;
}
