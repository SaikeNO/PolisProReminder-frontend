export interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  firstRegistrationDate: string;
  productionYear: string;
  vin: string;
  kw: number;
  km: number;
  capacity: number;
  mileage: number;
  vehicleBrand: string;
}

export interface CreateVehicle {
  name: string;
  registrationNumber: string;
  firstRegistrationDate: string;
  productionYear: string;
  vin: string;
  kw: number;
  km: number;
  capacity: number;
  mileage: number;
  vehicleBrandId: number;
}
