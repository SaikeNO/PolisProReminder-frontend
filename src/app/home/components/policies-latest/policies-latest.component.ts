import { Component, Injector, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { Policy } from '../../../shared/interfaces/policy';
import { PortalService } from '../../../shared/data-access/portal.service';
import { InsuranceTypePipe } from '../../../shared/pipes/insurance-type.pipe';
import { PoliciesFacade } from '../../../policies/data-access/state/policies.facade';
import {
  POLICY_DETAILS,
  PoliciesDetailsComponent,
} from '../../../policies/components/policies-details/policies-details.component';
import { CustomDatePipe } from '../../../shared/pipes/custom-date.pipe';

@Component({
  selector: 'app-policies-latest',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    ClipboardModule,
    CustomDatePipe,
    InsuranceTypePipe,
    AsyncPipe,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './policies-latest.component.html',
  styleUrl: './policies-latest.component.scss',
})
export class PoliciesLatestComponent implements OnInit {
  private policiesFacade = inject(PoliciesFacade);
  private portalService = inject(PortalService);
  private injector = inject(Injector);

  public policies$ = this.policiesFacade.latestPolicies$;
  public displayedColumns: string[] = [
    'details',
    'title',
    'policyNumber',
    'insurer',
    'insuranceCompany',
    'startDate',
    'endDate',
    'paymentDate',
    'insuranceTypes',
    'isPaid',
  ];

  ngOnInit(): void {
    this.policiesFacade.getLatestPolicies(5);
  }

  public openDetails(policy: Policy) {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        PoliciesDetailsComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: POLICY_DETAILS,
              useValue: policy,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }
}
