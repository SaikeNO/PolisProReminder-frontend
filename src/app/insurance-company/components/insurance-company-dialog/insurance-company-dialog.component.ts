import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateInsuranceCompany } from '../../../shared/interfaces/insuranceCompany';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-insurance-company-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule],
  templateUrl: './insurance-company-dialog.component.html',
  styleUrl: './insurance-company-dialog.component.scss',
})
export class InsuranceCompanyDialogComponent {
  public company: CreateInsuranceCompany;
  public isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InsuranceCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: CreateInsuranceCompany; isEditing: boolean },
  ) {
    this.company = data.company;
    this.isEditing = data.isEditing;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
