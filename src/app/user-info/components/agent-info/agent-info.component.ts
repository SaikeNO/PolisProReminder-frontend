import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/data-access/user.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-agent-info',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatListModule],
  templateUrl: './agent-info.component.html',
  styleUrl: './agent-info.component.scss',
})
export class AgentInfoComponent {
  private _userService = inject(UserService);
  public agent$ = this._userService.getAgentInfo();
}
