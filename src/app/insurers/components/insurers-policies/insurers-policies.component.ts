import { DatePipe } from '@angular/common';
import { Component, Injector, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Policy } from '../../../shared/interfaces/policy';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InsurersPoliciesDataSource } from './data-access/insurers-policies-datasource';
import { MatButtonModule } from '@angular/material/button';
import { InsuranceTypePipe } from '../../../shared/pipes/insurance-type.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { PortalService } from '../../../shared/data-access/portal.service';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  POLICY_DETAILS,
  PoliciesDetailsComponent,
} from '../../../policies/components/policies-details/policies-details.component';
import {
  POLICY_FORM,
  PoliciesFormComponent,
} from '../../../policies/components/policies-form/policies-form.component';
import { ConfirmDialogComponent } from '../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { filter, take } from 'rxjs';
import { PoliciesFacade } from '../../../policies/data-access/state/policies.facade';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-insurers-policies',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    InsuranceTypePipe,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './insurers-policies.component.html',
  styleUrl: './insurers-policies.component.scss',
})
export class InsurersPoliciesComponent implements OnInit {
  @Input({ required: true }) policies!: Policy[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Policy>;
  private portalService = inject(PortalService);
  private injector = inject(Injector);
  private policiesFacade = inject(PoliciesFacade);
  private dialog = inject(MatDialog);
  public dataSource!: InsurersPoliciesDataSource;
  public selection = new SelectionModel<Policy>(true, []);
  public visiblePolicies: Policy[] = [];

  displayedColumns = [
    'select',
    'details',
    'edit',
    'delete',
    'title',
    'policyNumber',
    'insuranceCompany',
    'startDate',
    'endDate',
    'paymentDate',
    'insuranceTypes',
    'isPaid',
  ];

  ngOnInit(): void {
    this.dataSource = new InsurersPoliciesDataSource(this.policies);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.visiblePolicies = this.policies;
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

  public openForm(policy?: Policy) {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        PoliciesFormComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: POLICY_FORM,
              useValue: policy,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }

  public onDeletePolicy(policy: Policy) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name: `${policy.title}`, withMessage: false },
      width: '500px',
    });

    dialog
      .afterClosed()
      .pipe(
        filter((res: boolean) => res),
        take(1),
      )
      .subscribe(() => this.policiesFacade.deletePolicy(policy.id));
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visiblePolicies.length;
    return numSelected === numRows;
  }

  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.visiblePolicies);
  }
}
