import { GetQuery } from '../../../shared/interfaces/getQuery';
import { Insurer } from '../../../shared/interfaces/insurer';

export interface InsurersState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  insurers: Insurer[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
