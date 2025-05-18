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
import { finalize } from 'rxjs';

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

  blockAssistant(assistantId: string) {
    this._assistantsService.lockoutAssistant(assistantId).subscribe();
  }

  deleteAssistant(assistantId: string) {
    this._assistantsService.deleteAssistant(assistantId).subscribe();
  }
}
