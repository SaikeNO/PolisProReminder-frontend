import { VehicleBrand } from '../../../shared/interfaces/vehicleBrand';

export interface VehicleBrandsState {
  isLoading: boolean;
  error: string | null;

  vehicleBrands: VehicleBrand[];
}
