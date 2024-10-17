import { GetQuery } from '../../../shared/interfaces/getQuery';
import { Insurer, InsurerBasicInfo } from '../../../shared/interfaces/insurer';

export interface InsurersState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  insurersBasicInfo: InsurerBasicInfo[];
  insurers: Insurer[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
