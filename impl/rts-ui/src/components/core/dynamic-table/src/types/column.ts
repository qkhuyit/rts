import type { ColumnsType } from 'ant-design-vue/es/table';
import type { FormSchema, GetFieldKeys } from '@/components/core/schema-form';
import type { ActionItem } from './tableAction';
import type { TableActionType } from '@/components/core/dynamic-table/src/types';
import type { DataIndex } from 'ant-design-vue/es/vc-table/interface';

export type ColumnType<T> = ColumnsType<T>[number];

export type CustomRenderParams<T extends object = Recordable> = Omit<
  Parameters<NonNullable<ColumnType<T>['customRender']>>[number],
  'column'
> & { column: TableColumn<T> };

/**
 * table properties
 */
export type TableColumn<T extends object = Recordable> = ColumnType<T> & {
  dataIndex?: GetFieldKeys<T> | ColumnKeyFlagType | Omit<DataIndex, string>;
  /** Specify the fields to search for */
  searchField?: string;
  /** Do not display this item in the query form */
  hideInSearch?: boolean;
  /** Do not display this column in Table */
  hideInTable?: boolean;
  /** The configuration passed to the search form Form.Item can be configured with rules */
  formItemProps?: Partial<FormSchema<T>>;
  /** The configuration passed to the editable form Form.Item can be configured with rules */
  editFormItemProps?: Partial<FormSchema<T>> & {
    /**
     * Whether to inherit all properties of the search form `TableColumn.formItemProps`, for deep copy merging
     * The pseudo code for the behavior when the value is `true` is as follows:
     * ```js
     * Object.assign({}, TableColumn.formItemProps, TableColumn.editFormItemProps)
     * ```
     * @defaultValue The default value is `true`
     * */
    extendSearchFormProps?: boolean;
  };
  /** Operation column, generally used to operate on a certain row of data in the table */
  actions?: (params: CustomRenderParams<T>, action: TableActionType) => ActionItem[];
  /** Whether the current cell is allowed to be edited */
  editable?: boolean | ((params: CustomRenderParams<T>) => boolean);
  /** Whether the current cell enables editing by default, only valid when `editableType` is `cell` */
  defaultEditable?: boolean;
};

export enum ColumnKeyFlag {
  ACTION = 'ACTION',
  INDEX = 'INDEX',
}

export const columnKeyFlags = Object.values(ColumnKeyFlag) as string[];
export type ColumnKeyFlagType = `${ColumnKeyFlag}`;
