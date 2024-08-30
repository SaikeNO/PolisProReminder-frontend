import { AsyncPipe } from '@angular/common';
import { Component, Inject, InjectionToken, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
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
import { AttachmentsListComponent } from '../../../shared/ui/attachments-list/attachments-list.component';
import { AttachmentParent } from '../../../shared/ui/attachments-list/data-access/attachments-list.service';
import { AttachmentInputComponent } from '../../../shared/ui/attachment-input/attachment-input.component';
import { MatExpansionModule } from '@angular/material/expansion';

export const VEHICLES_CONTAINER_FORM = new InjectionToken<{}>('VEHICLES_CONTAINER_FORM');

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
    AutocompleteComponent,
    MatNativeDateModule,
    MatDatepickerModule,
    AttachmentsListComponent,
    AttachmentInputComponent,
    MatExpansionModule,
  ],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss',
})
export class VehiclesFormComponent {
  private vehiclesFacade = inject(VehiclesFacade);
  private insurersFacade = inject(InsurersFacade);
  private vehicleBrandsFacade = inject(VehicleBrandsFacade);

  public attachmentParentEnum = AttachmentParent;
  public attachmentsToUpload: File[] = [];

  public error$ = this.vehiclesFacade.error$;
  public form = this.fb.group({
    name: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    firstRegistrationDate: this.fb.control<Date | null>(null),
    productionYear: this.fb.control<Date | null>(null),
    vin: ['', Validators.maxLength(17)],
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

  public onAttachmentsChange(attachments: File[]) {
    this.attachmentsToUpload = attachments;
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const vehicle = replaceEmptyStringWithNull(this.form.value) as CreateVehicle;

    vehicle.attachments = this.attachmentsToUpload;

    if (this.vehicle) {
      this.vehiclesFacade.editVehicle(vehicle, this.vehicle.id);
    } else {
      this.vehiclesFacade.createVehicle(vehicle);
    }
  }
}
