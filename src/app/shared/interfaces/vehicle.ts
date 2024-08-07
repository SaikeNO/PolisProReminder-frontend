import { Insurer } from './insurer';
import { VehicleBrand } from './vehicleBrand';

export interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  firstRegistrationDate: Date;
  productionYear: Date;
  vin: string;
  kw: number;
  km: number;
  capacity: number;
  mileage: number;
  vehicleBrand: VehicleBrand;
  insurer: Insurer;
}

export interface CreateVehicle {
  name: string;
  registrationNumber: string;
  firstRegistrationDate: Date;
  productionYear: Date;
  vin: string;
  kw: number;
  km: number;
  capacity: number;
  mileage: number;
  vehicleBrandId: number;
  insurerId: number;
  attachments: File[];
}
