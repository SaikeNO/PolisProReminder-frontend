import { GetPoliciesQuery } from '../../../shared/interfaces/getQuery';
import { Policy } from '../../../shared/interfaces/policy';
export interface PoliciesState {
  isLoading: boolean;
  error: string | null;
  query: GetPoliciesQuery;

  policies: Policy[];
  latestPolicies: Policy[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
