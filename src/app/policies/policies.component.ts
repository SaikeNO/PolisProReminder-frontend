import { Component, Injector, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  takeUntil,
} from 'rxjs';
import { Policy } from '../shared/interfaces/policy';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { PoliciesFacade } from './data-access/state/policies.facade';
import { getPaginatorIntl } from '../shared/utils/paginator-intl';
import { GetQuery } from '../shared/interfaces/getQuery';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortalService } from '../shared/data-access/portal.service';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  POLICY_DETAILS,
  PoliciesDetailsComponent,
} from './components/policies-details/policies-details.component';

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
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private policiesFacade = inject(PoliciesFacade);
  private portalService = inject(PortalService);
  private injector = inject(Injector);
  private onDestroy$ = new Subject<void>();

  public policies$ = this.policiesFacade.policies$;
  public totalItemsCount$ = this.policiesFacade.totalItemsCount$;

  public searchQuery$ = new BehaviorSubject<string>('');
  public displayedColumns: string[] = [
    'details',
    'edit',
    'delete',
    'title',
    'policyNumber',
    'insurer',
    'insuranceCompany',
    'startDate',
    'endDate',
    'paymentDate',
    'isPaid',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Policy>;

  ngAfterViewInit(): void {
    this.searchQuery$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.loadPolicies();
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.loadPolicies());

    this.loadPolicies();
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

  public openForm(policy: Policy) {}
  public onDeletePolicy(policy: Policy) {}

  private loadPolicies() {
    const query: GetQuery = {
      searchPhrase: this.searchQuery$.getValue(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortBy: this.sort.active ? this.sort.active.toLowerCase() : '',
      sortDirection: this.sort.direction ? this.sort.direction : 'none',
    };

    this.policiesFacade.getPolicies(query);
  }
}
