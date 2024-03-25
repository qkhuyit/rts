import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.RoleEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 320,
    hideInSearch: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 400,
    align: 'left',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'Active',
            value: '1',
          },
          {
            label: 'Inactive',
            value: '0',
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
    title: 'Description',
    dataIndex: 'description',
  },
];
