import { FilterQueryCriteria } from './filter-query-criteria.model';
import { PaginationQueryOptions } from './pagination-query-options.model';
import { SortQueryOptions } from './sort-query-options.model';

export type QueryCriteria = PaginationQueryOptions &
  Partial<SortQueryOptions> &
  Partial<FilterQueryCriteria>;
