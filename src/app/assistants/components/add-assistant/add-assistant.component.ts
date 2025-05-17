import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { AssistantsService } from '../../data-access/assistants.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-assistant',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-assistant.component.html',
  styleUrl: './add-assistant.component.scss',
})
export class AddAssistantComponent implements OnDestroy {
  private _formBuilder = inject(FormBuilder);
  private _assistantService = inject(AssistantsService);
  private _snackBarService = inject(SnackBarService);
  private _dialogRef = inject(MatDialogRef<AddAssistantComponent>);
  private _onDestroy$ = new Subject<void>();

  form = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this._assistantService
      .createAssistant({
        email: this.form.value.email!,
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
      })
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        this._dialogRef.close();
        this._snackBarService.openSucces('Poprawnie dodano asystenta');
      });
  }
}
