export type SortDirection = 'asc' | 'desc' | '';

export interface GetQuery {
  searchPhrase?: string;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
}
