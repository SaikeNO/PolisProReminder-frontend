export type SortDirection = 'asc' | 'desc' | 'none';

export interface GetQuery {
  searchPhrase?: string;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
  typeId?: number;
}
