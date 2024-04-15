import { Policy } from '../../../shared/interfaces/policy';

export interface GetPolicies {
  startIndex: number;
  pageSize: number;
}

export interface PoliciesState {
  isLoading: boolean;
  policies: Policy[];
  error: string | null;
}
