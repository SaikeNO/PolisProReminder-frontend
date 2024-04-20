import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { InsurersDataSource } from './data-access/insurers-datasource';
import { Insurer } from '../shared/interfaces/insurer';

@Component({
  selector: 'app-insurers',
  templateUrl: './insurers.component.html',
  styleUrl: './insurers.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class InsurersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Insurer>;

  private dataSource = new InsurersDataSource();
  public displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'pesel'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
