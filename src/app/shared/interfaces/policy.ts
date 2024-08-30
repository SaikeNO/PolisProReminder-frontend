import { InsuranceCompany } from './insuranceCompany';
import { InsuranceType } from './insuranceType';
import { Insurer } from './insurer';

export interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  insuranceCompany: InsuranceCompany;
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  insurer?: Insurer;
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
  attachments: File[];
}
