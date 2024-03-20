import { Badge, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.TaskEntity;
export type TableColumnItem = TableColumn<TableListItem>;

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return '#d9d9d9';
    case 1:
      return '#52c41a';
  }
};

const getStatusInfo = (status) => {
  switch (status) {
    case 0:
      return 'Stop';
    case 1:
      return 'Run';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: 'Status',
    width: 100,
    dataIndex: 'status',

    customRender: ({ record }) => (
      <Badge
        status={record.status === 1 ? 'processing' : 'default'}
        color={getStatusColor(record.status)}
        text={getStatusInfo(record.status)}
      />
    ),
  },
  {
    title: 'Type',
    width: 80,
    dataIndex: 'type',
    customRender: ({ record }) => (
      <Tag color={'processing'}>{record.type === 1 ? 'Interval' : 'Cron'}</Tag>
    ),
  },
  {
    title: 'Service',
    dataIndex: 'service',
    hideInSearch: true,
    width: 220,
  },
  {
    title: 'Data',
    dataIndex: 'data',
    hideInSearch: true,
    width: 220,
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
];
