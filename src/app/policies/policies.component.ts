import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Policy } from '../shared/interfaces/policy';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { PoliciesDataSource } from './data-access/policies-datasource';

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
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private dataSource = new PoliciesDataSource();

  public searchQuery$ = new BehaviorSubject<string>('');
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

  // ngOnInit(): void {
  //   this.policies$ = combineLatest([
  //     this.searchQuery$,
  //     this.policyService.getPolicies(),
  //   ]).pipe(
  //     map(([searchQuery, data]) =>
  //       data.filter(
  //         (x) =>
  //           x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           x.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     )
  //   );
  // }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Policy>;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(filterValue);
  }
}
