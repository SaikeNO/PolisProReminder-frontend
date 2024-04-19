import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  CreateInsuranceCompany,
  InsuranceCompany,
} from '../../../shared/interfaces/insuranceCompany';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { filter, map, take } from 'rxjs';
import { CompaniesFacade } from '../../data-access/state/companies.facade';

@Component({
  selector: 'app-insurance-company-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './insurance-company-dialog.component.html',
  styleUrl: './insurance-company-dialog.component.scss',
})
export class InsuranceCompanyDialogComponent implements OnInit {
  private companiesFacade = inject(CompaniesFacade);
  private fb = inject(FormBuilder);

  public isEditing: boolean = false;
  public companyId: number | null = null;
  public form = this.fb.nonNullable.group({
    name: ['', [Validators.minLength(3), Validators.required]],
  });
  public initialCompany: InsuranceCompany | null = null;

  constructor(
    public dialogRef: MatDialogRef<InsuranceCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: InsuranceCompany | null },
  ) {
    this.initialCompany = data.company;
    this.form.controls.name.setValue(data.company ? data.company.name : '');
    this.isEditing = !!data.company;
    this.companyId = data.company ? data.company.id : null;
  }

  ngOnInit(): void {
    this.dialogRef
      .afterClosed()
      .pipe(
        filter((response: FormGroup) => response && response.valid),
        map((response) => ({ name: response.controls['name'].value }) as CreateInsuranceCompany),
        take(1),
      )
      .subscribe((company) => {
        if (this.isEditing && this.companyId) {
          return this.companiesFacade.editCompany(company, this.companyId);
        } else {
          return this.companiesFacade.createCompany(company);
        }
      });
  }

  isSubmitDisabled() {
    return this.form.invalid || this.initialCompany?.name === this.form.controls.name.value;
  }
}
