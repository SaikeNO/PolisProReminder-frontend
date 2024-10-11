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
  insurerId: string;
  insurerName: string;
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
  insurerId: string;
  attachments: File[];
}
