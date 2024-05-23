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
import { MatSelectModule } from '@angular/material/select';

import { CompaniesFacade } from '../../../insurance-company/data-access/state/companies.facade';
import { AutocompleteComponent } from '../../../shared/ui/autocomplete/autocomplete.component';
import { CreatePolicy, Policy } from '../../../shared/interfaces/policy';
import { Option } from '../../../shared/ui/autocomplete/autocomplete.model';
import { InsurersFacade } from '../../../insurers/data-access/state/insurers.facade';
import { InsuranceTypesFacade } from '../../../insurance-types/data-access/state/insurance-types.facade';
import { replaceEmptyStringWithNull } from '../../../shared/helpers/replaceEmptyStringWithNull';
import { PoliciesFacade } from '../../data-access/state/policies.facade';
import { greaterThan } from '../../../shared/validators/date.validator';
import { PolicyForm } from './policy-form.models';

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
  private policiesFacade = inject(PoliciesFacade);
  private insuranceTypesFacade = inject(InsuranceTypesFacade);
  private insuranceCompaniesFacade = inject(CompaniesFacade);
  private insurersFacade = inject(InsurersFacade);

  public insuranceCompanies$ = this.insuranceCompaniesFacade.companies$.pipe(
    map((companies) => companies.map((c) => ({ id: c.id, value: c.shortName }) as Option)),
  );

  public insurers$ = this.insurersFacade.insurers$.pipe(
    map((insurers) =>
      insurers.map((i) => ({ id: i.id, value: `${i.lastName} ${i.firstName}` }) as Option),
    ),
  );

  public insuranceTypes$ = this.insuranceTypesFacade.insuranceTypes$;

  public form = this.fb.group<PolicyForm>({
    title: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    policyNumber: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    insuranceCompanyId: this.fb.control(null, [Validators.required]),
    startDate: this.fb.control(null, [Validators.required]),
    endDate: this.fb.control(null),
    paymentDate: this.fb.control(null),
    isPaid: this.fb.nonNullable.control(false),
    insurerId: this.fb.control(null, Validators.required),
    insuranceTypeIds: this.fb.nonNullable.control([]),
  });

  constructor(@Inject(POLICY_FORM) public policy: Policy | undefined) {}

  ngOnInit(): void {
    this.insuranceTypesFacade.getInsuranceTypes();
    this.insuranceCompaniesFacade.getCompanies();
    this.insurersFacade.getInsurers();
    this.updateValidators();

    if (!this.policy) return;
    this.form.patchValue({
      title: this.policy.title,
      policyNumber: this.policy.policyNumber,
      endDate: this.policy.endDate,
      startDate: this.policy.startDate,
      insuranceCompanyId: this.policy.insuranceCompany?.id,
      insurerId: this.policy.insurer?.id,
      isPaid: this.policy.isPaid,
      paymentDate: this.policy.paymentDate,
      insuranceTypeIds: this.policy.insuranceTypes.map((t) => t.id),
    });
  }

  public onSubmit() {
    const policy = replaceEmptyStringWithNull(this.form.value) as CreatePolicy;
    if (this.form.invalid) return;

    if (this.policy) {
      this.policiesFacade.editPolicy(policy, this.policy.id);
    } else {
      this.policiesFacade.createPolicy(policy);
    }
  }

  private updateValidators() {
    const startDateControl = this.form.controls.startDate;
    const endDateControl = this.form.controls.endDate;
    const paymentDateControl = this.form.controls.paymentDate;
    endDateControl.setValidators([Validators.required, greaterThan(startDateControl)]);
    paymentDateControl.setValidators([Validators.required, greaterThan(startDateControl)]);

    endDateControl.updateValueAndValidity();
    paymentDateControl.updateValueAndValidity();
  }
}
