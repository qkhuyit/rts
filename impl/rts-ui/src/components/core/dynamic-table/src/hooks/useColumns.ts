import { ref, watchEffect, unref, useSlots, h } from 'vue';
import { cloneDeep, isFunction, mergeWith } from 'lodash-es';
import { Input } from 'ant-design-vue';
import { EditableCell } from '../components';
import { ColumnKeyFlag, columnKeyFlags, type CustomRenderParams } from '../types/column';
import tableConfig from '../dynamic-table.config';
import type { Slots } from 'vue';
import type {
  TableActionType,
  TableColumn,
  TableMethods,
  TableState,
  DynamicTableProps,
} from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { isBoolean } from '@/utils/is';
import { TableAction } from '@/components/core/dynamic-table/src/components';

export type UseTableColumnsContext = {
  state: TableState;
  props: DynamicTableProps;
  methods: TableMethods;
  tableAction: TableActionType;
  slots: Slots;
};

export const useColumns = ({ state, methods, props, tableAction }: UseTableColumnsContext) => {
  const slots = useSlots();
  const innerColumns = ref(props.columns);
  const { getColumnKey } = methods;
  const { getProps } = state;
  const { isEditable } = tableAction;

  watchEffect(() => {
    const innerProps = { ...unref(getProps) };

    const columns = cloneDeep(innerProps!.columns!.filter((n) => !n.hideInTable));

    // Whether to add a serial number column
    if (innerProps?.showIndex) {
      columns.unshift({
        dataIndex: ColumnKeyFlag.INDEX,
        title: 'Serial',
        width: 60,
        align: 'center',
        fixed: 'left',
        ...innerProps?.indexColumnProps,
        customRender: ({ index }) => {
          const getPagination = unref(state.paginationRef);
          if (isBoolean(getPagination)) {
            return index + 1;
          }
          const { current = 1, pageSize = 10 } = getPagination!;
          return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
        },
      } as TableColumn);
    }

    // @ts-ignore
    innerColumns.value = columns.map((item) => {
      const customRender = item.customRender;

      const rowKey = props.rowKey as string;
      const columnKey = getColumnKey(item) as string;

      item.align ||= tableConfig.defaultAlign;

      item.customRender = (options) => {
        const { record, index, text } = options as CustomRenderParams<Recordable<any>>;
        /** Whether the edit line mode is enabled for the current line */
        const isEditableRow = isEditable(record[rowKey]);
        /** Whether cell editing mode is enabled */
        const isEditableCell = innerProps.editableType === 'cell';
        /** Whether the current cell is allowed to be edited */
        const isCellEditable = isBoolean(item.editable)
          ? item.editable
          : item.editable?.(options) ?? true;
        /** Whether to allow editing */
        const isShowEditable =
          (isEditableRow || isEditableCell) &&
          isCellEditable &&
          !columnKeyFlags.includes(columnKey);

        return isShowEditable
          ? h(
              EditableCell,
              {
                schema: getColumnFormSchema(item, record) as any,
                rowKey: record[rowKey] ?? index,
                editableType: innerProps.editableType,
                column: options,
              },
              { default: () => customRender?.(options) ?? text, ...slots },
            )
          : customRender?.(options);
      };

      // Operation column
      if (item.actions && columnKey === ColumnKeyFlag.ACTION) {
        item.customRender = (options) => {
          const { record, index } = options;
          return h(TableAction, {
            actions: item.actions!(options, tableAction),
            rowKey: record[rowKey] ?? index,
            columnParams: options,
          });
        };
      }
      return {
        key: item.key ?? (item.dataIndex as Key),
        dataIndex: item.dataIndex ?? (item.key as Key),
        ...item,
      } as TableColumn;
    });
  });

  function mergeCustomizer(objValue, srcValue, key) {
    /** Here we focus on the merge processing when `componentProps` is a function */
    if (key === 'componentProps') {
      return (...rest) => {
        return {
          ...(isFunction(objValue) ? objValue(...rest) : objValue),
          ...(isFunction(srcValue) ? srcValue(...rest) : srcValue),
        };
      };
    }
  }

  /** Get the form schema of the current row */
  const getColumnFormSchema = (item: TableColumn, record: Recordable): FormSchema => {
    const key = getColumnKey(item) as string;
    /** Whether to inherit the properties of the search form */
    const isExtendSearchFormProps = !Object.is(
      item.editFormItemProps?.extendSearchFormProps,
      false,
    );

    return {
      field: `${record[props.rowKey as string]}.${item.searchField ?? key}`,
      component: () => Input,
      defaultValue: record[key],
      colProps: {
        span: unref(getProps).editableType === 'cell' ? 20 : 24,
      },
      formItemProps: {
        help: '',
      },
      ...(isExtendSearchFormProps
        ? mergeWith(cloneDeep(item.formItemProps), item.editFormItemProps, mergeCustomizer)
        : item.editFormItemProps),
    };
  };

  return {
    innerColumns,
  };
};
