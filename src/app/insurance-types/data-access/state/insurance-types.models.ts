import { InsuranceType } from '../../../shared/interfaces/insuranceType';

export interface InsuranceTypesState {
  isLoading: boolean;
  insuranceTypes: InsuranceType[];
  error: string | null;
}
