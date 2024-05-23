import { FormControl } from '@angular/forms';

export interface PolicyForm {
  title: FormControl<string | null>;
  policyNumber: FormControl<string | null>;
  insuranceCompanyId: FormControl<number | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
  paymentDate: FormControl<Date | null>;
  isPaid: FormControl<boolean>;
  insurerId: FormControl<number | null>;
  insuranceTypeIds: FormControl<number[]>;
}
