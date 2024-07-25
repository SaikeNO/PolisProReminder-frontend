import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VehicleBrand } from '../../shared/interfaces/vehicleBrand';

@Injectable({ providedIn: 'root' })
export class VehicleBrandsService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getVehicleBrands() {
    return this.http.get<VehicleBrand[]>(`${this.url}/VehicleBrand/`);
  }

  getVehicleBrand(id: string) {
    return this.http.get<VehicleBrand>(`${this.url}/VehicleBrand/${id}`);
  }
}
