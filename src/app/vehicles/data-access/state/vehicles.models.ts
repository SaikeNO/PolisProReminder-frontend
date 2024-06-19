import { GetQuery } from '../../../shared/interfaces/getQuery';
import { Vehicle } from '../../../shared/interfaces/vehicle';

export interface VehiclesState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  vehicles: Vehicle[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
