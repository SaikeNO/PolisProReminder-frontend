import { Component, Inject, InjectionToken } from '@angular/core';
import { Vehicle } from '../../../shared/interfaces/vehicle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorInfoComponent } from '../../../shared/ui/error-info/error-info.component';

export const VEHICLE_CONTAINER_DATA = new InjectionToken<{}>('VEHICLE_CONTAINER_DATA');

@Component({
  selector: 'app-vehicles-details',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, ErrorInfoComponent],
  templateUrl: './vehicles-details.component.html',
  styleUrl: './vehicles-details.component.scss',
})
export class VehiclesDetailsComponent {
  constructor(@Inject(VEHICLE_CONTAINER_DATA) public vehicle: Vehicle | undefined) {}
}
