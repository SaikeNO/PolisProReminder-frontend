import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, map, merge, of } from 'rxjs';
import { Policy } from '../../../../shared/interfaces/policy';

export class InsurersPoliciesDataSource extends DataSource<Policy> {
  data!: Policy[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(policies: Policy[]) {
    super();
    this.data = policies;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Policy[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(of(this.data), this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Policy[]): Policy[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Policy[]): Policy[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'policyNumber':
          return compare(a.policyNumber, b.policyNumber, isAsc);
        case 'insuranceCompany':
          return compare(a.insuranceCompany, b.insuranceCompany, isAsc);
        case 'startDate':
          return compare(a.startDate.toString(), b.startDate.toString(), isAsc);
        case 'endDate':
          return compare(a.endDate.toString(), b.endDate.toString(), isAsc);
        case 'paymentDate':
          return compare(a.paymentDate.toString(), b.paymentDate.toString(), isAsc);
        case 'isPaid':
          return compare(+a.isPaid, +b.isPaid, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
