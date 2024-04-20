import { Insurer } from '../../../shared/interfaces/insurer';

export interface GetPaginatedInsurers {
  pageIndex: number;
  pageSize: number;
}

export interface InsurersState {
  isLoading: boolean;
  insurers: Insurer[];
  error: string | null;
}
