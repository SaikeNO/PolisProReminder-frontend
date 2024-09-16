export type SortDirection = 'asc' | 'desc' | 'none';

export interface GetQuery {
  searchPhrase?: string;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
}

export interface GetPoliciesQuery extends GetQuery {
  typeId?: string;
  isArchived: boolean;
}
