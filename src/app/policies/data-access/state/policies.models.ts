import { Policy } from '../../../shared/interfaces/policy';
export interface PoliciesState {
  isLoading: boolean;
  error: string | null;

  policies: Policy[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
