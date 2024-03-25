import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.RoleEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '#',
    dataIndex: 'id',
    width: 55,
    hideInSearch: true,
  },
  {
    title: 'Name',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: 'Display Name',
    width: 180,
    dataIndex: 'value',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 80,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'Active',
            value: 1,
          },
          {
            label: 'Inactive',
            value: 0,
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const enable = ~~record.status === 1;
      return <Tag color={enable ? 'green' : 'red'}>{enable ? 'Active' : 'Inactive'}</Tag>;
    },
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];
