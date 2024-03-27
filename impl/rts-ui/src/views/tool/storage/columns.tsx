import { Tag, Tooltip, Image, Progress } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { formatToDateTime } from '@/utils/dateUtil';
import { baseApiUrl } from '@/utils/request';

export type TableListItem = API.StorageInfo;
export type TableColumnItem = TableColumn<TableListItem>;

export type FileItem = {
  file: File;
  uid: string;
  name: string;
  size: number;
  status: string;
  thumbUrl: string;
  percent: number;
};

export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export const baseColumns: TableColumnItem[] = [
  {
    title: 'File Name',
    dataIndex: 'name',
    width: 150,
    ellipsis: true,
    customRender({ record }) {
      return (
        <Tooltip>
          {{
            title: () => record.path,
            default: () => (
              <a href={baseApiUrl + record.path} target="_blank">
                {record.name}
              </a>
            ),
          }}
        </Tooltip>
      );
    },
  },
  {
    title: 'Preview',
    dataIndex: 'path',
    width: 150,
    customRender({ record }) {
      return <Image src={baseApiUrl + record.path}></Image>;
    },
  },
  {
    title: 'File Extension',
    dataIndex: 'extName',
    width: 80,
  },
  {
    title: 'Category',
    dataIndex: 'type',
    width: 80,
  },
  {
    title: 'Size',
    dataIndex: 'size',
    width: 80,
    customRender: ({ record }) => {
      return <Tag color="blue">{record.size}</Tag>;
    },
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    width: 160,
    customRender: ({ record }) => formatToDateTime(record.createdAt),
  },
];

export const fileListColumns: TableColumn<FileItem>[] = [
  {
    dataIndex: 'thumbUrl',
    title: 'Thumbnail',
    width: 100,
    customRender: ({ record }) => {
      const { thumbUrl } = record;
      return thumbUrl && <Image src={thumbUrl} />;
    },
  },
  {
    dataIndex: 'name',
    title: 'File Name',
    align: 'left',
    customRender: ({ text, record }) => {
      const { percent, status: uploadStatus } = record || {};
      let status: 'normal' | 'exception' | 'active' | 'success' = 'normal';
      if (uploadStatus === UploadResultStatus.ERROR) {
        status = 'exception';
      } else if (uploadStatus === UploadResultStatus.UPLOADING) {
        status = 'active';
      } else if (uploadStatus === UploadResultStatus.SUCCESS) {
        status = 'success';
      }
      return (
        <div>
          <p class="truncate mb-1 max-w-[280px]" title={text}>
            {text}
          </p>
          <Progress percent={percent} size="small" status={status} />
        </div>
      );
    },
  },
  {
    dataIndex: 'size',
    title: 'File Size',
    width: 100,
    customRender: ({ text = 0 }) => {
      return text && `${(text / 1024).toFixed(2)}KB`;
    },
  },
  {
    dataIndex: 'status',
    title: 'Status',
    width: 100,
    customRender: ({ text }) => {
      if (text === UploadResultStatus.SUCCESS) {
        return <Tag color="green">Upload successful</Tag>;
      } else if (text === UploadResultStatus.ERROR) {
        return <Tag color="red">Upload failed</Tag>;
      } else if (text === UploadResultStatus.UPLOADING) {
        return <Tag color="blue">Uploading</Tag>;
      }

      return text || 'To be uploaded';
    },
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
