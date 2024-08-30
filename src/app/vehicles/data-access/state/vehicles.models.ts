import { Attachment } from '../../../shared/interfaces/attachment';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { Vehicle } from '../../../shared/interfaces/vehicle';

export interface VehiclesState {
  isLoading: boolean;
  error: string | null;
  query: GetQuery;

  vehicles: Vehicle[];
  attachments: Attachment[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}
