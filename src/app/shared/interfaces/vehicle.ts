import { InsurerBasicInfo } from './insurer';
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
  insurers: InsurerBasicInfo[];
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
  vehicleBrandId: string;
  insurerIds: string[];
  attachments: File[];
}
