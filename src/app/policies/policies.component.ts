import { Component, inject } from '@angular/core';
import { PoliciesSerivce } from './data-access/policies.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Policy } from '../shared/interfaces/policy';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private policyService = inject(PoliciesSerivce);
  public policies$ = new Observable<Policy[]>();
  public searchQuery$ = new BehaviorSubject<string>('');

  //https://material.angular.io/components/table/examples#table-http

  public displayedColumns: string[] = [
    'id',
    'title',
    'policyNumber',
    'insurer',
    'insuranceCompany',
    'startDate',
    'endDate',
    'paymentDate',
    'isPaid',
  ];

  ngOnInit(): void {
    this.policies$ = combineLatest([
      this.searchQuery$,
      this.policyService.getPolicies(),
    ]).pipe(
      map(([searchQuery, data]) =>
        data.filter(
          (x) =>
            x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            x.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(filterValue);
  }
}
