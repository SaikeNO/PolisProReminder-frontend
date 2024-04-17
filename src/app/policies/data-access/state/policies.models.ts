import { Policy } from '../../../shared/interfaces/policy';

export interface GetPaginatedPolicies {
  pageIndex: number;
  pageSize: number;
}

export interface PoliciesState {
  isLoading: boolean;
  policies: Policy[];
  error: string | null;
}
