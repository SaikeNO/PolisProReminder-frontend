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
import { VehicleBrandsFacade } from '../../../vehicle-brands/data-access/state/vehicle-brands.facade';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss',
})
export class VehiclesFormComponent {
  private vehiclesFacade = inject(VehiclesFacade);
  private insurersFacade = inject(InsurersFacade);
  private vehicleBrandsFacade = inject(VehicleBrandsFacade);

  public error$ = this.vehiclesFacade.error$;
  public form = this.fb.group({
    name: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    firstRegistrationDate: this.fb.control<Date | null>(null),
    productionYear: this.fb.control<Date | null>(null),
    vin: [''],
    kw: this.fb.control<number | null>(null),
    km: this.fb.control<number | null>(null),
    capacity: this.fb.control<number | null>(null),
    mileage: this.fb.control<number | null>(null),
    insurerId: ['', Validators.required],
    vehicleBrandId: ['', Validators.required],
  });

  public insurers$ = this.insurersFacade.insurers$.pipe(
    map((insurers) =>
      insurers.map((i) => ({ id: i.id, value: `${i.lastName} ${i.firstName}` }) as Option),
    ),
  );

  public vehicleBrands$ = this.vehicleBrandsFacade.vehicles$.pipe(
    map((brands) => brands.map((b) => ({ id: b.id, value: b.name }) as Option)),
  );

  constructor(
    private fb: FormBuilder,
    @Inject(VEHICLES_CONTAINER_FORM) public vehicle: Vehicle | undefined,
  ) {}

  ngOnInit(): void {
    this.insurersFacade.getAllInsurers();
    this.vehicleBrandsFacade.getVehicleBrands();

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

    this.replaceZerosWithNull();

    if (this.vehicle) {
      this.vehiclesFacade.editVehicle(vehicle, this.vehicle.id);
    } else {
      this.vehiclesFacade.createVehicle(vehicle);
    }
  }

  private replaceZerosWithNull() {
    const formValue = this.form.value;

    console.log(formValue);

    formValue.capacity = formValue.capacity === 0 ? null : formValue.capacity;
    formValue.kw = formValue.kw === 0 ? null : formValue.kw;
    formValue.km = formValue.km === 0 ? null : formValue.km;
    formValue.mileage = formValue.mileage === 0 ? null : formValue.mileage;
  }
}
