import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Policy } from '../../../shared/interfaces/policy';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InsurersPoliciesDataSource } from './data-access/insurers-policies-datasource';
import { MatButtonModule } from '@angular/material/button';
import { InsuranceTypePipe } from '../../../shared/pipes/insurance-type.pipe';

@Component({
  selector: 'app-insurers-policies',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    InsuranceTypePipe,
  ],
  templateUrl: './insurers-policies.component.html',
  styleUrl: './insurers-policies.component.scss',
})
export class InsurersPoliciesComponent implements OnInit {
  @Input({ required: true }) policies!: Policy[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Policy>;
  public dataSource!: InsurersPoliciesDataSource;

  displayedColumns = [
    'title',
    'policyNumber',
    'insuranceCompany',
    'startDate',
    'endDate',
    'paymentDate',
    'insuranceTypes',
    'isPaid',
  ];

  ngOnInit(): void {
    this.dataSource = new InsurersPoliciesDataSource(this.policies);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
