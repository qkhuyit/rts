// @ts-ignore
/* eslint-disable */

declare namespace API {
  /** Globally return results through table query */
  type TableListResult<T = any> = {
    items?: T;
    meta?: PaginationResult;
  };

  /** Global common table paging return data structure */
  type PaginationResult = {
    itemCount?: number;
    totalItems?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };

  /** Global common form paging request parameters */
  type PageParams<T = any> = {
    page?: number;
    pageSize?: number;
  } & {
    [P in keyof T]?: T[P];
  };

  type ErrorResponse = {
    /** Business agreed error code */
    errorCode: string;
    /** Business error messages */
    errorMessage?: string;
    /** Is the business request successful? */
    success?: boolean;
  };
}
