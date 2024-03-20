import { computed, reactive, ref, unref, watch } from 'vue';
import { omit } from 'lodash-es';
import tableConfig from '../dynamic-table.config';
import { useScroll } from './useScroll';
import type { Slots } from 'vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableProps, Table } from 'ant-design-vue';
import type { SchemaForm } from '@/components/core/schema-form';
import { useI18n } from '@/hooks/useI18n';

export type Pagination = TableProps['pagination'];

export interface TableState extends ReturnType<typeof useTableState> {}

export type UseTableStateParams = {
  props: DynamicTableProps;
  slots: Slots;
};

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export const useTableState = ({ props, slots }: UseTableStateParams) => {
  const { t } = useI18n();
  const { scroll } = useScroll({ props });
  /** Table example */
  const tableRef = ref<InstanceType<typeof Table>>();
  /** Query form example */
  const queryFormRef = ref<InstanceType<typeof SchemaForm>>();
  /** Form instance for editing table */
  const editTableFormRef = ref<InstanceType<typeof SchemaForm>>();
  /** tabular data */
  const tableData = ref<any[]>([]);
  /** internal properties */
  const innerPropsRef = ref<Partial<DynamicTableProps>>();
  /** Paging configuration parameters */
  const paginationRef = ref<NonNullable<Pagination>>(false);
  /** Table loading */
  const loadingRef = ref<boolean>(!!props.loading);
  /** Edit form model */
  const editFormModel = ref<Recordable>({});
  /** All form items that failed validation */
  const editFormErrorMsgs = ref(new Map());
  /** The format of the keys of all rows currently being edited is：`${recordKey}`  */
  const editableRowKeys = ref(new Set<Key>());
  /** The format of the keys of all cells currently being edited is：`${recordKey}.${dataIndex}`，Valid only when `editableType` is `cell`  */
  const editableCellKeys = ref(new Set<Key>());
  /** Search parameters when sorting or filtering tables */
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });

  if (!Object.is(props.pagination, false)) {
    paginationRef.value = {
      current: 1,
      pageSize: tableConfig.defaultPageSize,
      total: 0,
      pageSizeOptions: [...tableConfig.pageSizeOptions],
      showQuickJumper: true,
      showSizeChanger: true, // The display can change the number of pages per page
      showTotal: (total) => t('component.table.total', { total }), // Show total
      // onChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      // onShowSizeChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      ...props.pagination,
    };
  }

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) };
  });

  const getBindValues = computed(() => {
    const props = unref(getProps);

    let propsData: Recordable = {
      ...props,
      rowKey: props.rowKey ?? 'id',
      loading: props.loading ?? unref(loadingRef),
      pagination: unref(paginationRef),
      tableLayout: props.tableLayout ?? 'fixed',
      scroll: unref(scroll),
    };
    if (slots.expandedRowRender) {
      propsData = omit(propsData, 'scroll');
    }

    propsData = omit(propsData, ['class', 'onChange', 'columns']);
    return propsData;
  });

  // If the dataSource is set by the outside world, use the data provided by the outside world directly.
  watch(
    () => props.dataSource,
    (val) => {
      if (val) {
        tableData.value = val;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    () => props.columns,
    (val) => {
      if (val) {
        innerPropsRef.value = {
          ...innerPropsRef.value,
          columns: val,
        };
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return {
    tableRef,
    editTableFormRef,
    loadingRef,
    tableData,
    queryFormRef,
    innerPropsRef,
    getProps,
    getBindValues,
    paginationRef,
    editFormModel,
    editFormErrorMsgs,
    editableCellKeys,
    editableRowKeys,
    searchState,
  };
};
