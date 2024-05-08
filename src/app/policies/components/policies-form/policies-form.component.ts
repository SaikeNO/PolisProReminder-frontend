import { Component, Inject, InjectionToken, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CompaniesFacade } from '../../../insurance-company/data-access/state/companies.facade';
import { AutocompleteComponent } from '../../../shared/ui/autocomplete/autocomplete.component';
import { Policy } from '../../../shared/interfaces/policy';
import { Option } from '../../../shared/ui/autocomplete/autocomplete.model';
import { InsurersFacade } from '../../../insurers/data-access/state/insurers.facade';
import { InsuranceTypesFacade } from '../../../insurance-types/data-access/state/insurance-types.facade';
import { MatSelectModule } from '@angular/material/select';
import { replaceEmptyStringWithNull } from '../../../shared/helpers/replaceEmptyStringWithNull';

export const POLICY_FORM = new InjectionToken<{}>('POLICY_FORM');

@Component({
  selector: 'app-policies-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe,
    AutocompleteComponent,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './policies-form.component.html',
  styleUrl: './policies-form.component.scss',
})
export class PoliciesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private insuranceCompaniesFacade = inject(CompaniesFacade);
  private insurersFacade = inject(InsurersFacade);
  private insuranceTypesFacade = inject(InsuranceTypesFacade);

  public insuranceCompanies$ = this.insuranceCompaniesFacade.companies$.pipe(
    map((companies) => companies.map((c) => ({ id: c.id, value: c.shortName }) as Option)),
  );

  public insurers$ = this.insurersFacade.insurers$.pipe(
    map((insurers) => insurers.map((i) => ({ id: i.id, value: i.lastName }) as Option)),
  );

  public insuranceTypes$ = this.insuranceTypesFacade.insuranceTypes$;

  public form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    policyNumber: ['', [Validators.required, Validators.maxLength(60)]],
    insuranceCompany: ['', [Validators.required]],
    startDate: [''],
    endDate: [''],
    paymentDate: [''],
    isPaid: [''],
    insurer: ['', Validators.required],
    insuranceTypes: [''],
  });

  constructor(@Inject(POLICY_FORM) public policy: Policy | undefined) {}

  ngOnInit(): void {
    this.insuranceTypesFacade.getInsuranceTypes();
    this.insuranceCompaniesFacade.getCompanies();
    this.insurersFacade.getInsurers();
  }

  public onSubmit() {
    console.log(this.form.value);
    console.log(replaceEmptyStringWithNull(this.form.value));
  }
}
