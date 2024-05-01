import { Component, Inject, InjectionToken } from '@angular/core';
import { Insurer } from '../../../shared/interfaces/insurer';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { InsurersPoliciesComponent } from '../insurers-policies/insurers-policies.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorInfoComponent } from '../../../shared/ui/error-info/error-info.component';

export const INSURER_DETAILS = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-insurers-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    InsurersPoliciesComponent,
    MatIconModule,
    MatButtonModule,
    ErrorInfoComponent,
  ],
  templateUrl: './insurers-details.component.html',
  styleUrl: './insurers-details.component.scss',
})
export class InsurersDetailsComponent {
  constructor(@Inject(INSURER_DETAILS) public insurer: Insurer | undefined) {}
}
