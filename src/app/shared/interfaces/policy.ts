import { InsuranceType } from './insuranceType';
import { Insurer } from './insurer';

export interface Policy {
  id: number;
  title: string;
  policyNumber: string;
  insuranceCompany: string;
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  insurer?: Insurer;
  insuranceTypes: InsuranceType[];
}
