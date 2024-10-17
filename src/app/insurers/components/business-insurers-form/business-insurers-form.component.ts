import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Inject, InjectionToken, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { nipRegex, phoneRegex, regonRegex } from '../../../shared/constants/regex';
import { InsurersFacade } from '../../data-access/state/insurers.facade';
import { CreateBusinessInsurer, BusinessInsurer } from '../../../shared/interfaces/insurer';
import { replaceEmptyStringWithNull } from '../../../shared/helpers/replaceEmptyStringWithNull';
import { AsYouType } from 'libphonenumber-js/min';
import { Subject, takeUntil } from 'rxjs';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-business-insurers-form',
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
  templateUrl: './business-insurers-form.component.html',
  styleUrl: './business-insurers-form.component.scss',
})
export class BusinessInsurersFormComponent implements OnInit, OnDestroy {
  private insurersFacade = inject(InsurersFacade);
  private onDestroy$ = new Subject<void>();

  public error$ = this.insurersFacade.error$;
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    nip: ['', [Validators.pattern(nipRegex)]],
    regon: ['', [Validators.pattern(regonRegex)]],
    phoneNumber: ['', Validators.pattern(phoneRegex)],
    email: ['', Validators.email],
    postalCode: ['', [Validators.maxLength(6)]],
    city: ['', [Validators.maxLength(60)]],
    street: ['', [Validators.maxLength(60)]],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(CONTAINER_DATA) public insurer: BusinessInsurer | undefined,
  ) {}

  ngOnInit(): void {
    this.form.controls.phoneNumber.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        if (!value) return;
        const formatter = new AsYouType('PL');
        this.form.controls.phoneNumber.setValue(formatter.input(value), { emitEvent: false });
      });

    if (!this.insurer) return;

    this.form.setValue({
      name: this.insurer.name,
      nip: this.insurer.nip,
      regon: this.insurer.regon,
      phoneNumber: this.insurer.phoneNumber,
      email: this.insurer.email,
      postalCode: this.insurer.postalCode,
      city: this.insurer.city,
      street: this.insurer.street,
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const insurer = replaceEmptyStringWithNull(this.form.value) as CreateBusinessInsurer;

    if (this.insurer) {
      this.insurersFacade.editBusinessInsurer(insurer, this.insurer.id);
    } else {
      this.insurersFacade.createBusinessInsurer(insurer);
    }
  }
}
