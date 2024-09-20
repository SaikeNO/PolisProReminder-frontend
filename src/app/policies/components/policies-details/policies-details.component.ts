import { Component, Inject, InjectionToken } from '@angular/core';
import { Policy } from '../../../shared/interfaces/policy';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ErrorInfoComponent } from '../../../shared/ui/error-info/error-info.component';
import { AttachmentsListComponent } from '../../../shared/ui/attachments-list/attachments-list.component';
import { AttachmentParent } from '../../../shared/ui/attachments-list/data-access/attachments-list.service';

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
    AttachmentsListComponent,
  ],
  templateUrl: './policies-details.component.html',
  styleUrl: './policies-details.component.scss',
})
export class PoliciesDetailsComponent {
  constructor(@Inject(POLICY_DETAILS) public policy: Policy | undefined) {}

  public attachmentParentEnum = AttachmentParent;
}
