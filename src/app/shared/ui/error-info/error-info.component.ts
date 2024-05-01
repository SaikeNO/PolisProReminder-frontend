import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './error-info.component.html',
  styleUrl: './error-info.component.scss',
})
export class ErrorInfoComponent {}
