import { Component, inject } from '@angular/core';
import { LoadingBarService } from '../../data-access/loading-bar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [MatProgressBarModule, NgIf, AsyncPipe],
  templateUrl: './loading-bar.component.html',
})
export class LoadingBarComponent {
  private loadingService = inject(LoadingBarService);
  public isLoading$ = this.loadingService.isLoading$;
}
