import { Avatar, Space, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';
import { baseApiUrl } from '@/utils/request';

export type TableListItem = API.UserEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const getAvatarUrl = (path: string) => {
  return /^https?:\/\//.test(path) ? path : baseApiUrl + path;
};

export const baseColumns: TableColumnItem[] = [
  {
    title: 'Avatar',
    width: 80,
    dataIndex: 'avatar',
    hideInSearch: true,
    customRender: ({ record }) => <Avatar src={getAvatarUrl(record.avatar)} />,
  },
  {
    title: 'UserName',
    width: 120,
    dataIndex: 'username',
  },
  {
    title: 'Nickname',
    width: 120,
    hideInSearch: true,
    dataIndex: 'nickname',
  },
  {
    title: 'Department',
    dataIndex: 'dept',
    hideInSearch: true,
    width: 180,
    customRender: ({ record }) => {
      return <Tag>{record.dept?.name}</Tag>;
    },
  },
  {
    title: 'Role',
    dataIndex: 'roleNames',
    hideInSearch: true,
    width: 220,
    customRender: ({ record }) => (
      <Space>
        {record.roles.map((item) => (
          <Tag color={'success'} key={item.id}>
            {item.name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'Email',
    width: 120,
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    width: 120,
    dataIndex: 'phone',
  },
  {
    title: 'Remark',
    width: 120,
    dataIndex: 'remark',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'Enable',
            value: 1,
          },
          {
            label: 'Disable',
            value: 0,
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const isEnable = ~~record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    width: 120,
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    width: 120,
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];
