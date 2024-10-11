import { InsuranceCompany } from './insuranceCompany';
import { InsuranceType } from './insuranceType';

export interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  insuranceCompany: InsuranceCompany;
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  insurerId: string;
  insurerName?: string;
  note: string;
  insuranceTypes: InsuranceType[];
}

export interface CreatePolicy {
  title: string;
  policyNumber: string;
  insuranceCompanyId: number;
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  insurerId: number;
  insuranceTypeIds: number[];
  note: string;
  attachments: File[];
}
