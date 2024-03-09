import { Component } from '@angular/core';
import { PoliciesComponent } from '../policies/policies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoliciesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
