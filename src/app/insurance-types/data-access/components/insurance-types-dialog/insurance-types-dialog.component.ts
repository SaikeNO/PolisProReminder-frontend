import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { filter, map, take } from 'rxjs';
import { InsuranceTypesFacade } from '../../state/insurance-types.facade';
import { CreateInsuranceType, InsuranceType } from '../../../../shared/interfaces/insuranceType';

@Component({
  selector: 'app-insurance-insurance-types-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './insurance-types-dialog.component.html',
  styleUrl: './insurance-types-dialog.component.scss',
})
export class InsuranceTypesDialogComponent implements OnInit {
  private insuranceTypesFacade = inject(InsuranceTypesFacade);
  private fb = inject(FormBuilder);

  public isEditing: boolean = false;
  public insuranceTypeId: string | null = null;
  public form = this.fb.nonNullable.group({
    name: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
  });
  public initialInsuranceType: InsuranceType | null = null;

  constructor(
    public dialogRef: MatDialogRef<InsuranceTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { insuranceType: InsuranceType | null },
  ) {
    this.initialInsuranceType = data.insuranceType;
    this.form.controls.name.setValue(data.insuranceType ? data.insuranceType.name : '');
    this.isEditing = !!data.insuranceType;
    this.insuranceTypeId = data.insuranceType ? data.insuranceType.id : null;
  }

  ngOnInit(): void {
    this.dialogRef
      .afterClosed()
      .pipe(
        filter((response: FormGroup) => response && response.valid),
        map((response) => this.mapToCreateInsuranceInsuranceType(response)),
        take(1),
      )
      .subscribe((InsuranceType) => {
        if (this.isEditing && this.insuranceTypeId) {
          return this.insuranceTypesFacade.editInsuranceType(InsuranceType, this.insuranceTypeId);
        } else {
          return this.insuranceTypesFacade.createInsuranceType(InsuranceType);
        }
      });
  }

  isSubmitDisabled() {
    return this.form.invalid || this.initialInsuranceType?.name === this.form.controls.name.value;
  }

  private mapToCreateInsuranceInsuranceType(obj: FormGroup): CreateInsuranceType {
    return {
      name: obj.controls['name'].value,
    };
  }
}
