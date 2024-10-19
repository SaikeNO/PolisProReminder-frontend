import { Component, Injector, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  take,
  takeUntil,
} from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatChipsModule } from '@angular/material/chips';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { Policy } from '../shared/interfaces/policy';
import { PoliciesFacade } from './data-access/state/policies.facade';
import { getPaginatorIntl } from '../shared/utils/paginator-intl';
import { GetPoliciesQuery } from '../shared/interfaces/getQuery';
import { PortalService } from '../shared/data-access/portal.service';
import {
  POLICY_DETAILS,
  PoliciesDetailsComponent,
} from './components/policies-details/policies-details.component';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';
import {
  POLICY_FORM,
  PoliciesFormComponent,
} from './components/policies-form/policies-form.component';

import { InsuranceTypesFacade } from '../insurance-types/data-access/state/insurance-types.facade';
import { InsuranceTypePipe } from '../shared/pipes/insurance-type.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatChipsModule,
    InsuranceTypePipe,
    ClipboardModule,
  ],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private policiesFacade = inject(PoliciesFacade);
  private insuranceTypesFacade = inject(InsuranceTypesFacade);
  private portalService = inject(PortalService);
  private activatedRoute = inject(ActivatedRoute);
  private injector = inject(Injector);
  private dialog = inject(MatDialog);
  private onDestroy$ = new Subject<void>();

  public policies$ = this.policiesFacade.policies$;
  public totalItemsCount$ = this.policiesFacade.totalItemsCount$;
  public insuranceTypes$ = this.insuranceTypesFacade.insuranceTypes$;

  public searchQuery$ = new BehaviorSubject<string>('');
  public selection = new SelectionModel<Policy>(true, []);
  public selectedInsuranceTypeId: string | null = null;
  public visiblePolicies: Policy[] = [];
  public isArchived: boolean = this.activatedRoute.snapshot.data['isArchived'];
  public displayedColumns: string[] = [
    'select',
    'details',
    'edit',
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Policy>;

  ngAfterViewInit(): void {
    this.policies$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((policies) => (this.visiblePolicies = policies));

    this.searchQuery$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.loadPolicies();
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.loadPolicies());

    //this.loadPolicies();
    this.insuranceTypesFacade.getInsuranceTypes();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(filterValue);
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

  public onDeletePolicy() {
    const selectedPolicies = this.selection.selected;
    const name = selectedPolicies.length > 1 ? `${selectedPolicies.length} elementy` : '1 element';

    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name, withMessage: false },
      width: '500px',
    });

    dialog
      .afterClosed()
      .pipe(
        filter((res: boolean) => res),
        take(1),
      )
      .subscribe(() => {
        this.policiesFacade.deletePolicyBatch(selectedPolicies.map((p) => p.id));
        this.selection.clear();
      });
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

  public selectInsuranceTypeId(id: string) {
    if (this.selectedInsuranceTypeId === id) {
      this.selectedInsuranceTypeId = null;
    } else {
      this.selectedInsuranceTypeId = id;
    }

    this.loadPolicies();
  }

  private loadPolicies() {
    const query: GetPoliciesQuery = {
      searchPhrase: this.searchQuery$.getValue(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortBy: this.sort.active ? this.sort.active.toLowerCase() : '',
      sortDirection: this.sort.direction ? this.sort.direction : 'none',
      isArchived: this.isArchived,
      typeId: this.selectedInsuranceTypeId ? this.selectedInsuranceTypeId : undefined,
    };

    this.policiesFacade.getPolicies(query);
  }
}
