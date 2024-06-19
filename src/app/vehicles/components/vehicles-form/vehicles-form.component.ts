import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Inject, InjectionToken, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { VehiclesFacade } from '../../data-access/state/vehicles.facade';
import { CreateVehicle, Vehicle } from '../../../shared/interfaces/vehicle';
import { replaceEmptyStringWithNull } from '../../../shared/helpers/replaceEmptyStringWithNull';

export const VEHICLES_CONTAINER_FORM = new InjectionToken<{}>('VEHICLES_CONTAINER_FORM');

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
    NgFor,
  ],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss',
})
export class VehiclesFormComponent {
  private vehiclesFacade = inject(VehiclesFacade);

  public error$ = this.vehiclesFacade.error$;
  public form = this.fb.group({
    name: ['', Validators.required],
    // firstName: ['', [Validators.required, Validators.maxLength(20)]],
    // lastName: ['', [Validators.maxLength(20)]],
    // pesel: ['', [Validators.required, Validators.pattern(peselRegex)]],
    // phoneNumber: ['', Validators.pattern(phoneRegex)],
    // email: ['', Validators.email],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(VEHICLES_CONTAINER_FORM) public vehicle: Vehicle | undefined,
  ) {}

  ngOnInit(): void {
    if (!this.vehicle) return;

    this.form.setValue({
      name: this.vehicle.name,
      // firstName: this.vehicle.firstName,
      // lastName: this.vehicle.lastName,
      // pesel: this.vehicle.pesel,
      // phoneNumber: this.vehicle.phoneNumber,
      // email: this.vehicle.email,
    });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const vehicle = replaceEmptyStringWithNull(this.form.value) as CreateVehicle;

    if (this.vehicle) {
      this.vehiclesFacade.editVehicle(vehicle, this.vehicle.id);
    } else {
      this.vehiclesFacade.createVehicle(vehicle);
    }
  }
}
