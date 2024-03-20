import { nextTick, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableState } from './useTableState';
import type { TableColumn } from '../types/column';

type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
};

export type UseEditableType = ReturnType<typeof useEditable>;

export const useEditable = ({ state, props }: UseTableMethodsContext) => {
  const {
    tableData,
    editFormModel,
    editTableFormRef,
    editFormErrorMsgs,
    editableCellKeys,
    editableRowKeys,
  } = state;

  watch(
    () => props.editableType,
    (type) => {
      if (type === 'cell') {
        editableRowKeys.value.clear();
      } else {
        editableCellKeys.value.clear();
      }
    },
  );

  /** Set form values */
  const setEditFormModel = (recordKey: Key, editValue: Recordable) => {
    Reflect.set(editFormModel.value, recordKey, editValue);
    nextTick(() => {
      editTableFormRef.value?.setFormModel(recordKey, editValue);
    });
  };

  /** Get the value to edit */
  const getEditValue = (
    recordKey: Key,
    currentRow?: Recordable,
    columns?: TableColumn<Recordable<any>>[],
  ) => {
    // Clone the current row data as temporarily edited form data to avoid directly modifying the original data
    const editValue = cloneDeep(
      currentRow ?? tableData.value.find((n) => n[String(props.rowKey)] === recordKey),
    );
    // User-set default values take precedence
    columns?.forEach((item) => {
      const { formItemProps, editFormItemProps } = item;
      const field = (item.dataIndex || item.key) as string;
      if (
        !Object.is(editFormItemProps?.extendSearchFormProps, false) &&
        formItemProps &&
        Reflect.has(formItemProps, 'defaultValue')
      ) {
        editValue[field] = formItemProps.defaultValue;
      }
      if (editFormItemProps && Reflect.has(editFormItemProps, 'defaultValue')) {
        editValue[field] = editFormItemProps.defaultValue;
      }
    });
    return editValue;
  };

  /**
   * @description Enter edit line state
   *
   * @param recordKey The current row id, which is the rowKey of the table
   * @param currentRow Current row data
   */
  const startEditable = (recordKey: Key, currentRow?: Recordable) => {
    editableCellKeys.value.clear();
    console.log('startEditable editFormModel', editFormModel);
    // If it is a single line, multi-line editing is not allowed
    if (editableRowKeys.value.size > 0 && props.editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || 'Only one row can be edited at the same time');
      return false;
    }
    const editValue = getEditValue(recordKey, currentRow, props.columns);
    setEditFormModel(recordKey, editValue);
    editableRowKeys.value.add(recordKey);
    return true;
  };

  /** Enter the editing cell state */
  const startCellEditable = (recordKey: Key, dataIndex: Key, currentRow?: Recordable) => {
    editableRowKeys.value.clear();
    const targetColumn = props.columns.filter((n) => n.dataIndex === dataIndex);
    const editValue = getEditValue(recordKey, currentRow, targetColumn);

    editableCellKeys.value.add(`${recordKey}.${dataIndex}`);
    setEditFormModel(recordKey, {
      ...(getEditFormModel(recordKey) || editValue),
      [dataIndex]: editValue[dataIndex],
    });
  };

  /** Cancel cell editing */
  const cancelCellEditable = (recordKey: Key, dataIndex: Key) => {
    editableCellKeys.value.delete(`${recordKey}.${dataIndex}`);
    const editFormModel = getEditFormModel(recordKey);
    const record = tableData.value.find((n) => n[String(props.rowKey)] === recordKey);
    if (record) {
      // Cancel edits and restore default values
      Reflect.set(editFormModel, dataIndex, record[dataIndex]);
    }
    /** The validation error information of the form items is also cleared. */
    editFormErrorMsgs.value.delete(`${recordKey}.${dataIndex}`);
  };

  /**
   * Exit edit line status
   *
   * @param recordKey
   */
  const cancelEditable = (recordKey: Key) => {
    const formModel = getEditFormModel(recordKey);
    /** The validation error information of the form items is also cleared. */
    Object.keys(formModel).forEach((field) =>
      editFormErrorMsgs.value.delete(`${recordKey}.${field}`),
    );

    nextTick(() => {
      editTableFormRef.value?.delFormModel?.(recordKey);
    });

    editableRowKeys.value.delete(recordKey);
    return Reflect.deleteProperty(editFormModel.value, recordKey);
  };

  /** Is this line in editing status? */
  const isEditable = (recordKey: Key) => editableRowKeys.value.has(recordKey);

  /** Get the edited value of the form */
  const getEditFormModel = (recordKey: Key) => Reflect.get(editFormModel.value, recordKey);

  /** Whether the row editing form is verified or not */
  const validateRow = async (recordKey: Key) => {
    const nameList = Object.keys(getEditFormModel(recordKey)).map((n) => [String(recordKey), n]);
    const result = await editTableFormRef.value?.validateFields(nameList);
    return result?.[recordKey] ?? result;
  };

  /**
   * Whether the cell form is verified or not
   * @param recordKey Current row ID
   * @param dataIndex Current cell field name, eg: `column.dataIndex`
   *  */
  const validateCell = async (recordKey: Key, dataIndex: Key) => {
    const result = await editTableFormRef.value?.validateFields([[String(recordKey), dataIndex]]);
    return result?.[recordKey] ?? result;
  };

  return {
    setEditFormModel,
    startEditable,
    startCellEditable,
    cancelCellEditable,
    cancelEditable,
    isEditable,
    validateRow,
    validateCell,
    getEditFormModel,
  };
};
