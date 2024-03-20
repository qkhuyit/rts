import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.ParamConfigEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    title: 'Name',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: 'Key',
    dataIndex: 'key',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    sorter: true,
    width: 160,
    customRender: ({ record }) => formatToDateTime(record.createdAt),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Name',
    component: 'Input',
    colProps: { span: 8 },
  },
];
