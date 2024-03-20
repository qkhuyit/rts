import type { TableProps } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue/es/table';

/**
 * Parameters for loading table data
 */
export type LoadDataParams = TablePaginationConfig & {
  /** Define page numbers according to your business needs */
  page?: number;
  /** Define the number of page data items according to your own business needs */
  limit?: number;
};

/** Table onChange event callback parameters */
export type OnChangeCallbackParams = Parameters<NonNullable<TableProps['onChange']>>;

/** Table onChange event callback function */
export type OnChangeCallback = TableProps['onChange'];

/** Edit line type */
export type EditableType = 'single' | 'multiple' | 'cell';

/** Cell save callback */
export type OnSave<T = any> = (
  /** Row id, usually a unique id */
  key: Key,
  /** The value of the currently modified row, only form will be set. */
  record: T,
  /** The original value can be used to determine whether to modify */
  originRow: T,
) => Promise<any | void>;

/** Cell cancel save callback */
export type OnCancel<T = any> = (
  /** Row id, usually a unique id */
  key: Key,
  /** The value of the currently modified row, only form will be set. */
  record: T,
  /** The original value can be used to determine whether to modify */
  originRow: T,
) => any | void;
