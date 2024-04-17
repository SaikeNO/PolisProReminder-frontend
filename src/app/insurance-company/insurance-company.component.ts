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
import { CreateInsuranceCompany, InsuranceCompany } from '../shared/interfaces/insuranceCompany';
import { filter, switchMap, tap } from 'rxjs';

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
  private company: CreateInsuranceCompany = { name: '' };

  public companies$ = this.companiesFacade.companies$;

  ngOnInit() {
    this.companiesFacade.getCompanies();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InsuranceCompanyDialogComponent, {
      data: {
        company: { ...this.company },
      },
    });

    dialogRef.afterClosed().pipe(
      filter((response: CreateInsuranceCompany) => !!response.name),
      tap((createCompany) => this.companiesFacade.createCompany(createCompany)),
    );
  }
}
