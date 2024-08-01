import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  private duration = 2000;

  public openSucces(message: string): void {
    this.snackBar.open(message, 'Zamknij', { duration: this.duration });
  }

  public openFailure(message: string): void {
    this.snackBar.open(message, 'Zamknij', { duration: this.duration });
  }
}
