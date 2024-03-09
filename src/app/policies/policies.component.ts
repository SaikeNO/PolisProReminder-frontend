import { Component, inject } from '@angular/core';
import { PoliciesSerivce } from './data-access/policies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private policyService = inject(PoliciesSerivce);
  public policies$ = this.policyService.getPolicies();
}
