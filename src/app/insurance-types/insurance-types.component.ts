import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs';
import { InsuranceTypesFacade } from './data-access/state/insurance-types.facade';
import { InsuranceType } from '../shared/interfaces/insuranceType';
import { InsuranceTypesDialogComponent } from './components/insurance-types-dialog/insurance-types-dialog.component';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-insurance-types',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './insurance-types.component.html',
  styleUrl: './insurance-types.component.scss',
})
export class InsuranceTypesComponent implements OnInit {
  private insuranceTypesFacade = inject(InsuranceTypesFacade);
  private dialog = inject(MatDialog);

  public insruranceTypes$ = this.insuranceTypesFacade.insuranceTypes$;

  ngOnInit() {
    this.insuranceTypesFacade.getInsuranceTypes();
  }

  openDialog(insuranceType?: InsuranceType): void {
    this.dialog.open(InsuranceTypesDialogComponent, { data: { insuranceType } });
  }

  deleteInsuranceType(insuranceType: InsuranceType): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name: insuranceType.name },
      width: '500px',
    });

    dialog
      .afterClosed()
      .pipe(
        filter((res: boolean) => res),
        take(1),
      )
      .subscribe(() => this.insuranceTypesFacade.deleteInsuranceType(insuranceType.id));
  }
}
