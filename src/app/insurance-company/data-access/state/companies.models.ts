import { InsuranceCompany } from '../../../shared/interfaces/insuranceCompany';

export interface CompaniesState {
  isLoading: boolean;
  companies: InsuranceCompany[];
  error: string | null;
}
