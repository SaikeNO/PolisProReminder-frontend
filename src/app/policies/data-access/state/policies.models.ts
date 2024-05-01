import { GetQuery } from '../../../shared/interfaces/getQuery';
import { Policy } from '../../../shared/interfaces/policy';
export interface PoliciesState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  policies: Policy[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
