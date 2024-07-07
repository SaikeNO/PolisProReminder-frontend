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
import { map } from 'rxjs';
import { InsurersFacade } from '../../../insurers/data-access/state/insurers.facade';
import { Option } from '../../../shared/ui/autocomplete/autocomplete.model';
import { AutocompleteComponent } from '../../../shared/ui/autocomplete/autocomplete.component';

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
    AutocompleteComponent,
  ],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss',
})
export class VehiclesFormComponent {
  private vehiclesFacade = inject(VehiclesFacade);
  private insurersFacade = inject(InsurersFacade);

  public error$ = this.vehiclesFacade.error$;
  public form = this.fb.group({
    name: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    firstRegistrationDate: [''],
    productionYear: [''],
    vin: [''],
    kw: [0],
    km: [0],
    capacity: [0],
    mileage: [0],
    insurerId: ['', Validators.required],
    vehicleBrandId: ['', Validators.required],
  });

  public insurers$ = this.insurersFacade.insurers$.pipe(
    map((insurers) =>
      insurers.map((i) => ({ id: i.id, value: `${i.lastName} ${i.firstName}` }) as Option),
    ),
  );

  constructor(
    private fb: FormBuilder,
    @Inject(VEHICLES_CONTAINER_FORM) public vehicle: Vehicle | undefined,
  ) {}

  ngOnInit(): void {
    this.insurersFacade.getAllInsurers();

    if (!this.vehicle) return;

    this.form.setValue({
      name: this.vehicle.name,
      registrationNumber: this.vehicle.registrationNumber,
      firstRegistrationDate: this.vehicle.firstRegistrationDate,
      productionYear: this.vehicle.productionYear,
      vin: this.vehicle.vin,
      kw: this.vehicle.kw,
      km: this.vehicle.km,
      capacity: this.vehicle.capacity,
      mileage: this.vehicle.mileage,
      insurerId: this.vehicle.insurer.id,
      vehicleBrandId: this.vehicle.vehicleBrand.id,
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
