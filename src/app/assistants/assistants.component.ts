import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AssistantsService } from './data-access/assistants.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAssistantComponent } from './components/add-assistant/add-assistant.component';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, finalize } from 'rxjs';
import { SnackBarService } from '../shared/data-access/snack-bar.service';
import { ConfirmDialogComponent } from '../shared/ui/confirm-dialog/confirm-dialog.component';
import { User } from '../shared/interfaces/auth';

@Component({
  selector: 'app-assistants',
  imports: [
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    MatTooltipModule,
  ],
  templateUrl: './assistants.component.html',
  styleUrl: './assistants.component.scss',
})
export class AssistantsComponent implements OnInit {
  private _snackBarService = inject(SnackBarService);
  private _assistantsService = inject(AssistantsService);
  private _dialog = inject(MatDialog);
  public assistants$ = this._assistantsService.assistants$;
  public loading = false;

  ngOnInit(): void {
    this.loading = true;
    this._assistantsService
      .getAssistants()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe();
  }

  openDialog() {
    this._dialog.open(AddAssistantComponent, { width: '500px' });
  }

  unlockAssistant(assistantId: string) {
    this._assistantsService
      .unlockAssistant(assistantId)
      .subscribe(() => this._snackBarService.openSucces('Poprawnie odblokowano asystenta'));
  }

  lockoutAssistant(assistant: User) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Czy na pewno chcesz zablokować ${assistant.firstName} ${assistant.lastName}?`,
        message: 'Spowoduje to, że nie będzie on mógł się zalogować.',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => {
        this._assistantsService
          .lockoutAssistant(assistant.id)
          .subscribe(() => this._snackBarService.openSucces('Poprawnie zablokowano asystenta'));
      });
  }

  deleteAssistant(assistant: User) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Czy jesteś pewien, że chcesz usunąć ${assistant.firstName} ${assistant.lastName}?`,
        message: 'Spowoduje to, że asystent zostanie na stałe usunięty z systemu.',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => {
        this._assistantsService
          .deleteAssistant(assistant.id)
          .subscribe(() => this._snackBarService.openSucces('Poprawnie usunięto asystenta'));
      });
  }
}
