import { InsuranceCompany } from './insuranceCompany';
import { InsuranceType } from './insuranceType';
import { InsurerBasicInfo } from './insurer';

export interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  insuranceCompany: InsuranceCompany;
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  insurers: InsurerBasicInfo[];
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
  insurerIds: string[];
  insuranceTypeIds: string[];
  note: string;
  attachments: File[];
}
