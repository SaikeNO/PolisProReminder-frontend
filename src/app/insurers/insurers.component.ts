import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Insurer } from '../shared/interfaces/insurer';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PortalService } from '../shared/data-access/portal.service';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  CONTAINER_DATA,
  InsurersFormComponent,
} from './components/insurers-form/insurers-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';
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
import { InsurersFacade } from './data-access/state/insurers.facade';
import { InfoDialogComponent } from '../shared/ui/info-dialog/info-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  INSURER_DETAILS,
  InsurersDetailsComponent,
} from './components/insurers-details/insurers-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { GetQuery } from '../shared/interfaces/getQuery';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-insurers',
  templateUrl: './insurers.component.html',
  styleUrl: './insurers.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    AsyncPipe,
  ],
})
export class InsurersComponent implements AfterViewInit, OnDestroy {
  private portalService = inject(PortalService);
  private injector = inject(Injector);
  private dialog = inject(MatDialog);
  private insurersFacade = inject(InsurersFacade);
  private onDestroy$ = new Subject<void>();

  public searchQuery$ = new BehaviorSubject<string>('');
  public selection = new SelectionModel<Insurer>(true, []);
  public visibleInsurers: Insurer[] = [];
  public insurers$ = this.insurersFacade.insurers$;
  public totalItemsCount$ = this.insurersFacade.totalItemsCount$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Insurer>;

  public displayedColumns: string[] = [
    'select',
    'details',
    'edit',
    'delete',
    'firstName',
    'lastName',
    'pesel',
    'phoneNumber',
    'email',
    'address',
    'street',
  ];

  ngAfterViewInit(): void {
    this.insurers$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((insurers) => (this.visibleInsurers = insurers));

    this.searchQuery$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.loadInsurers();
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.loadInsurers());

    //this.loadInsurers();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(filterValue);
  }

  public openForm(insurer?: Insurer) {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        InsurersFormComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: CONTAINER_DATA,
              useValue: insurer,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }

  public openDetails(insurer: Insurer): void {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        InsurersDetailsComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: INSURER_DETAILS,
              useValue: insurer,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }

  public onDeleteInsurer(insurer: Insurer): void {
    if (insurer.policies?.length) {
      this.dialog.open(InfoDialogComponent, {
        data: {
          message: `Nie można usunąć ${insurer.firstName} ${insurer.lastName}`,
          subMessage: 'Klient posiada polisy',
        },
      });
    } else {
      const dialog = this.dialog.open(ConfirmDialogComponent, {
        data: { name: `${insurer.firstName} ${insurer.lastName}`, withMessage: false },
        width: '500px',
      });

      dialog
        .afterClosed()
        .pipe(
          filter((res: boolean) => res),
          take(1),
        )
        .subscribe(() => this.insurersFacade.deleteInsurer(insurer.id));
    }
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visibleInsurers.length;
    return numSelected === numRows;
  }

  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.visibleInsurers);
  }

  private loadInsurers() {
    const query: GetQuery = {
      searchPhrase: this.searchQuery$.getValue(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortBy: this.sort.active ? this.sort.active.toLowerCase() : '',
      sortDirection: this.sort.direction ? this.sort.direction : 'none',
    };

    this.insurersFacade.getPaginatedInsurers(query);
  }
}
