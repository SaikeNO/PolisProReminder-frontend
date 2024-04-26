import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { peselRegex, phoneRegex } from '../../../shared/constants/regex';
import { InsurersFacade } from '../../data-access/state/insurers.facade';
import { CreateInsurer, Insurer } from '../../../shared/interfaces/insurer';
import { replaceEmptyStringWithNull } from '../../../shared/helpers/replaceEmptyStringWithNull';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-insurers-form',
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
  templateUrl: './insurers-form.component.html',
  styleUrl: './insurers-form.component.scss',
})
export class InsurersFormComponent implements OnInit {
  private insurersFacade = inject(InsurersFacade);

  public error$ = this.insurersFacade.error$;
  public form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(20)]],
    lastName: ['', [Validators.maxLength(20)]],
    pesel: ['', [Validators.required, Validators.pattern(peselRegex)]],
    phoneNumber: ['', Validators.pattern(phoneRegex)],
    email: ['', Validators.email],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(CONTAINER_DATA) public insurer: Insurer | undefined,
  ) {}

  ngOnInit(): void {
    if (!this.insurer) return;

    this.form.setValue({
      firstName: this.insurer.firstName,
      lastName: this.insurer.lastName,
      pesel: this.insurer.pesel,
      phoneNumber: this.insurer.phoneNumber,
      email: this.insurer.email,
    });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const insurer = replaceEmptyStringWithNull(this.form.value) as CreateInsurer;

    if (this.insurer) {
      this.insurersFacade.editInsurer(insurer, this.insurer.id);
    } else {
      this.insurersFacade.createInsurer(insurer);
    }
  }
}
