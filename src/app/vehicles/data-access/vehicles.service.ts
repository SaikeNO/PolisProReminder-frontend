import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GetQuery } from '../../shared/interfaces/getQuery';
import { PageResult } from '../../shared/interfaces/pageResult';
import { CreateVehicle, Vehicle } from '../../shared/interfaces/vehicle';
import { Attachment } from '../../shared/interfaces/attachment';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getVehicles(query: GetQuery) {
    return this.http.get<PageResult<Vehicle>>(`${this.url}/Vehicle/`, {
      params: { ...query },
    });
  }

  createVehicle(vehicle: CreateVehicle) {
    const formData = new FormData();
    vehicle.attachments.forEach((attachment) => {
      formData.append('attachments', attachment);
    });

    formData.append(
      'jsonString',
      JSON.stringify({
        ...vehicle,
        productionYear: moment(vehicle.productionYear).format('YYYY-MM-DD'),
        firstRegistrationDate: moment(vehicle.firstRegistrationDate).format('YYYY-MM-DD'),
      }),
    );
    return this.http.post<void>(`${this.url}/Vehicle`, formData);
  }

  editVehicle(vehicle: CreateVehicle, id: string) {
    const formData = new FormData();
    vehicle.attachments.forEach((attachment) => {
      formData.append('attachments', attachment);
    });

    formData.append(
      'jsonString',
      JSON.stringify({
        ...vehicle,
        productionYear: moment(vehicle.productionYear).format('YYYY-MM-DD'),
        firstRegistrationDate: moment(vehicle.firstRegistrationDate).format('YYYY-MM-DD'),
      }),
    );
    return this.http.put<void>(`${this.url}/Vehicle/${id}`, formData);
  }

  deleteVehicle(id: string) {
    return this.http.delete<void>(`${this.url}/Vehicle/${id}`);
  }

  getAttachments(vehicleId: string) {
    return this.http.get<Attachment[]>(`${this.url}/Vehicle/${vehicleId}/attachments`);
  }
}
