import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CompaniesFacade } from './data-access/state/companies.facade';
import { InsuranceCompanyDialogComponent } from './components/insurance-company-dialog/insurance-company-dialog.component';
import { InsuranceCompany } from '../shared/interfaces/insuranceCompany';
import { filter, take } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-insurance-company',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './insurance-company.component.html',
  styleUrl: './insurance-company.component.scss',
})
export class InsuranceCompanyComponent implements OnInit {
  private companiesFacade = inject(CompaniesFacade);
  private dialog = inject(MatDialog);

  public companies$ = this.companiesFacade.companies$;

  ngOnInit() {
    this.companiesFacade.getCompanies();
  }

  openDialog(company?: InsuranceCompany): void {
    this.dialog.open(InsuranceCompanyDialogComponent, { data: { company } });
  }

  deleteCompany(company: InsuranceCompany): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { name: company.name },
      width: '500px',
    });

    dialog
      .afterClosed()
      .pipe(
        filter((res: boolean) => res),
        take(1),
      )
      .subscribe(() => this.companiesFacade.deleteCompany(company.id));
  }
}
