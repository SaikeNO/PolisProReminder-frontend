import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { AssistantsService } from './data-access/assistants.service';
import { Assistant } from '../../../shared/interfaces/assistant';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assistants',
  imports: [MatCardModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './assistants.component.html',
  styleUrl: './assistants.component.scss',
})
export class AssistantsComponent implements OnInit {
  private assistantsService = inject(AssistantsService);
  assistants: Assistant[] = [];
  loading = true;

  ngOnInit(): void {
    this.assistantsService.getAssistants().subscribe({
      next: (data) => {
        this.assistants = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
