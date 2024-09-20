import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
import { ComponentPortal } from '@angular/cdk/portal';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import {
  VEHICLE_CONTAINER_DATA,
  VehiclesDetailsComponent,
} from './components/vehicles-details/vehicles-details.component';
import { VehiclesFacade } from './data-access/state/vehicles.facade';
import { GetQuery } from '../shared/interfaces/getQuery';
import { Vehicle } from '../shared/interfaces/vehicle';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';
import { PortalService } from '../shared/data-access/portal.service';
import {
  VEHICLES_CONTAINER_FORM,
  VehiclesFormComponent,
} from './components/vehicles-form/vehicles-form.component';
@Component({
  selector: 'app-vehicles',
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
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements AfterViewInit, OnDestroy {
  private portalService = inject(PortalService);
  private injector = inject(Injector);
  private dialog = inject(MatDialog);
  private vehiclesFacade = inject(VehiclesFacade);
  private onDestroy$ = new Subject<void>();

  public searchQuery$ = new BehaviorSubject<string>('');
  public selection = new SelectionModel<Vehicle>(true, []);
  public visibleVehicles: Vehicle[] = [];
  public vehicles$ = this.vehiclesFacade.vehicles$;
  public totalItemsCount$ = this.vehiclesFacade.totalItemsCount$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;

  public displayedColumns: string[] = [
    'select',
    'details',
    'edit',
    'delete',
    'name',
    'vehicleBrand',
    'registrationNumber',
    'insurer',
    'firstRegistrationDate',
    'productionYear',
    'vin',
    'kw',
    'km',
    'capacity',
    'mileage',
  ];

  ngAfterViewInit(): void {
    this.vehicles$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((vehicles) => (this.visibleVehicles = vehicles));

    this.searchQuery$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.loadVehicles();
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.loadVehicles());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(filterValue);
  }

  public openForm(vehicle?: Vehicle) {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        VehiclesFormComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: VEHICLES_CONTAINER_FORM,
              useValue: vehicle,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }

  public openDetails(vehicle: Vehicle): void {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        VehiclesDetailsComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: VEHICLE_CONTAINER_DATA,
              useValue: vehicle,
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }

  public onDeleteVehicle(vehicle: Vehicle): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name: vehicle.name, withMessage: false },
      width: '500px',
    });

    dialog
      .afterClosed()
      .pipe(
        filter((res: boolean) => res),
        take(1),
      )
      .subscribe(() => this.vehiclesFacade.deleteVehicle(vehicle.id));
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visibleVehicles.length;
    return numSelected === numRows;
  }

  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.visibleVehicles);
  }

  private loadVehicles() {
    const query: GetQuery = {
      searchPhrase: this.searchQuery$.getValue(),
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortBy: this.sort.active ? this.sort.active.toLowerCase() : '',
      sortDirection: this.sort.direction ? this.sort.direction : 'none',
    };

    this.vehiclesFacade.getPaginatedVehicles(query);
  }
}
