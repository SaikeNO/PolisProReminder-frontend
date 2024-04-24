import { AfterViewInit, Component, Injector, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { InsurersDataSource } from './data-access/insurers-datasource';
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
import { filter, take } from 'rxjs';
import { InsurersFacade } from './data-access/state/insurers.facade';

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
  ],
})
export class InsurersComponent implements AfterViewInit {
  private dataSource = new InsurersDataSource();
  private portalService = inject(PortalService);
  private injector = inject(Injector);
  private dialog = inject(MatDialog);
  private insurersFacade = inject(InsurersFacade);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Insurer>;

  public displayedColumns: string[] = [
    'edit',
    'delete',
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'pesel',
  ];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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

  onDeleteInsurer(insurer: Insurer): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name: `${insurer.firstName} ${insurer.lastName}` },
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
