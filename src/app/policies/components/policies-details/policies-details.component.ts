import { Component, Inject, InjectionToken } from '@angular/core';
import { Policy } from '../../../shared/interfaces/policy';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ErrorInfoComponent } from '../../../shared/ui/error-info/error-info.component';

export const POLICY_DETAILS = new InjectionToken<{}>('POLICY_DETAILS');

@Component({
  selector: 'app-policies-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    MatChipsModule,
    ErrorInfoComponent,
  ],
  templateUrl: './policies-details.component.html',
  styleUrl: './policies-details.component.scss',
})
export class PoliciesDetailsComponent {
  constructor(@Inject(POLICY_DETAILS) public policy: Policy | undefined) {}
}
