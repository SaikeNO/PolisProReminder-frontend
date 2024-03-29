import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, merge, iif } from 'rxjs';
import { Policy } from '../../shared/interfaces/policy';
import { PoliciesSerivce } from './policies.service';
import { inject } from '@angular/core';

/**
 * Data source for the Policies view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PoliciesDataSource extends DataSource<Policy> {
  private policyService = inject(PoliciesSerivce);

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
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

      return merge(
        this.policyService.getPolicies(),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        switchMap((v) =>
          iif(
            () => v instanceof PageEvent,
            this.getPagedData(),
            this.getSortedData()
          )
        )
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
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
  private getPagedData(): Observable<Policy[]> {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return this.policyService.getPolicies(
        startIndex,
        this.paginator.pageSize
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(): Observable<Policy[]> {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return this.policyService.getPolicies();
    }

    return this.policyService.getPolicies().pipe(
      tap((data) =>
        data.sort((a, b) => {
          const isAsc = this.sort?.direction === 'asc';
          switch (this.sort?.active) {
            case 'name':
              return compare(a.title, b.title, isAsc);
            case 'id':
              return compare(+a.id, +b.id, isAsc);
            default:
              return 0;
          }
        })
      )
    );
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
