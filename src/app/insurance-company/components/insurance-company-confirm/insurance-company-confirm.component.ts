import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InsuranceCompany } from '../../../shared/interfaces/insuranceCompany';

@Component({
  selector: 'app-insurance-company-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './insurance-company-confirm.component.html',
})
export class InsuranceCompanyConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<InsuranceCompanyConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: InsuranceCompany },
  ) {}
}
