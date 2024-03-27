import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.DeptEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'Department name',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: 'Sort',
    dataIndex: 'orderNo',
    width: 50,
    hideInSearch: true,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    width: 200,
    hideInSearch: true,
    customRender: ({ record }) => formatToDateTime(record.createdAt),
  },
];
