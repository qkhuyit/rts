import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.OnlineUserInfo;

export const baseColumns: TableColumn<TableListItem>[] = [
  {
    title: 'Session Number',
    dataIndex: 'tokenId',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    customRender: ({ record }) => (
      <div>
        <span class="pr-4px">{record.username}</span>
        {record.isCurrent && <Tag color="processing">我</Tag>}
      </div>
    ),
  },
  {
    title: 'Department Name',
    dataIndex: 'deptName',
  },
  {
    title: 'Login IP',
    dataIndex: 'ip',
    width: 140,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Browser',
    dataIndex: 'browser',
  },
  {
    title: 'Operation System',
    dataIndex: 'os',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 180,
    customRender: ({ record }) => formatToDateTime(record.time),
  },
];
