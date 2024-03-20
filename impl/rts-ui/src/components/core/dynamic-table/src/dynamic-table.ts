import { tableProps } from 'ant-design-vue/es/table';
import tableConfig from './dynamic-table.config';
import type { PropType, ExtractPublicPropTypes } from 'vue';
import type { BookType } from 'xlsx';
import type { TableColumn, OnChangeCallbackParams, EditableType, OnSave, OnCancel } from './types/';
import type { SchemaFormProps } from '@/components/core/schema-form';
import type { GetRowKey } from 'ant-design-vue/es/table/interface';
import { isBoolean } from '@/utils/is';

export const dynamicTableProps = {
  ...tableProps(),
  rowKey: {
    type: [String, Function] as PropType<string | GetRowKey<any>>,
    default: 'id',
  },
  /** Whether to display the search form */
  search: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** Form attribute configuration */
  formProps: {
    type: Object as PropType<SchemaFormProps>,
    default: () => ({}),
  },
  /** Table column configuration */
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
    default: () => [],
  },
  sortFn: {
    type: Function as PropType<(sortInfo: OnChangeCallbackParams[2]) => any>,
    default: tableConfig.defaultSortFn,
  },
  filterFn: {
    type: Function as PropType<(data: OnChangeCallbackParams[1]) => any>,
    default: tableConfig.defaultFilterFn,
  },
  /** Interface request configuration */
  fetchConfig: {
    type: Object as PropType<Partial<typeof tableConfig.fetchConfig>>,
    default: () => tableConfig.fetchConfig,
  },
  /** Table data request function */
  dataRequest: {
    // Get list data function API
    type: Function as PropType<(params: Recordable) => Promise<API.TableListResult | any[]>>,
  },
  // Additional request parameters
  searchParams: {
    type: Object as PropType<Recordable>,
  },
  /** Whether to display the index number */
  showIndex: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** Index column attribute configuration */
  indexColumnProps: {
    type: Object as PropType<Partial<TableColumn>>,
    default: () => ({}),
  },
  /** Whether to display the table toolbar */
  showToolBar: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** Whether to display table settings */
  showTableSetting: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** Table title */
  headerTitle: String as PropType<string>,
  /** Table title prompt information */
  titleTooltip: String as PropType<string>,
  /** Table adaptive height */
  autoHeight: Boolean as PropType<boolean>,
  // excel export configuration
  /** Exported file name */
  exportFileName: {
    type: String as PropType<string>,
  },
  /** xlsx booktype */
  exportBookType: {
    type: String as PropType<BookType>,
    default: 'xlsx',
  },
  /** Automatic width */
  exportAutoWidth: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** Custom data export format function */
  exportFormatter: {
    type: Function as PropType<
        (columns: TableColumn[], tableData: any[]) => { header: string[]; data: any[] }
    >,
    default: null,
  },
  /** Edit line type
   * @const `single`: Only one line can be edited at the same time
   * @const `multiple`: edit multiple lines at the same time
   * @const `cell`: editable cell
   * @defaultValue `single`
   */
  editableType: {
    type: String as PropType<EditableType>,
    default: 'single',
  },
  /** Cell save editing callback */
  onSave: {
    type: Function as PropType<OnSave>,
  },
  /** Cell cancel editing callback */
  onCancel: {
    type: Function as PropType<OnCancel>,
  },
  /** Tips for editing only one line */
  onlyOneLineEditorAlertMessage: String,
} as const;

export type DynamicTableProps = ExtractPublicPropTypes<typeof dynamicTableProps> &
  EmitsToProps<DynamicTableEmits>;

export const dynamicTableEmits = {
  change: (...rest: OnChangeCallbackParams) => rest.length === 4,
  'toggle-advanced': (isAdvanced: boolean) => isBoolean(isAdvanced),
  'fetch-error': (error) => error,
  search: (params) => params,
  reload: () => true,
  'update:expandedRowKeys': (keys: Key[]) => keys,
  'expanded-rows-change': (keyValues: string[]) => Array.isArray(keyValues),
};

export type DynamicTableEmits = typeof dynamicTableEmits;

export type DynamicTableEmitFn = EmitFn<DynamicTableEmits>;
