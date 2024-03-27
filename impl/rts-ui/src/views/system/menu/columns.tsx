import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { Icon } from '@/components/basic/icon';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.MenuItemInfo;
export type TableColumnItem = TableColumn<TableListItem>;

/**
 * Convert the corresponding menu type to a string literal
 */
const getMenuType = (type) => {
  switch (type) {
    case 0:
      return <Tag color="warning">Table of contents</Tag>;
    case 1:
      return <Tag color="success">Menu</Tag>;
    case 2:
      return <Tag color="error">Permissions</Tag>;
    default:
      return '';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'left',
    fixed: 'left',
    width: 200,
  },
  {
    title: 'Icon',
    width: 40,
    dataIndex: 'icon',
    hideInSearch: true,
    customRender: ({ record }) => record.icon && <Icon icon={record.icon} size="22" />,
  },
  {
    title: 'Type',
    width: 80,
    dataIndex: 'type',
    hideInSearch: true,
    customRender: ({ record }) => getMenuType(record.type),
  },
  {
    title: 'Node routing',
    dataIndex: 'path',
    width: 180,
    ellipsis: true,
  },
  {
    title: 'File path',
    width: 180,
    dataIndex: 'component',
  },
  {
    title: 'Permission ID',
    width: 180,
    dataIndex: 'permission',
    hideInSearch: true,
    customRender: ({ record }) =>
      record.permission && <Tag color="processing">{record.permission}</Tag>,
  },
  {
    title: 'Sort Order',
    width: 50,
    dataIndex: 'orderNo',
    hideInSearch: true,
  },
  {
    title: 'Route cache',
    dataIndex: 'keepalive',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => record.type === 1 && (record.keepAlive ? '是' : '否'),
  },
  {
    title: 'Whether to display',
    dataIndex: 'show',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const show = record.show;
      const enable = ~~show === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Show' : 'Hide';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Enable' : 'Disable';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: 'Update time',
    width: 180,
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender({ text }) {
      return formatToDateTime(text);
    },
  },
];
