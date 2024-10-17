import { GetQuery } from '../../../shared/interfaces/getQuery';
import {
  BusinessInsurer,
  IndividualInsurer,
  InsurerBasicInfo,
} from '../../../shared/interfaces/insurer';

export interface InsurersState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  insurersBasicInfo: InsurerBasicInfo[];
  individualInsurers: IndividualInsurer[];
  businessInsurers: BusinessInsurer[];

  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
