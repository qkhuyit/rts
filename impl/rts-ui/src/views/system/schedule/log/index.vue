<template>
  <DynamicTable
    header-title="Mission log"
    :data-request="Api.systemLog.logTaskList"
    :search="false"
    :columns="columns"
    size="middle"
  />
</template>

<script setup lang="tsx">
  import { Tag } from 'ant-design-vue';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import Api from '@/api/';
  import { formatToDateTime } from '@/utils/dateUtil';

  defineOptions({
    name: 'SystemScheduleTaskLog',
  });

  type TableListItem = API.TaskLogEntity;

  const [DynamicTable] = useTable();

  const getStatusType = (status) => {
    switch (status) {
      case 0:
        return 'red';
      case 1:
        return 'green';
    }
  };
  const getStatusTip = (status) => {
    switch (status) {
      case 0:
        return 'Fail';
      case 1:
        return 'Success';
    }
  };

  const columns: TableColumn<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
    },
    {
      title: 'Task number',
      dataIndex: ['task', 'id'],
      width: 80,
    },
    {
      title: 'Mission name',
      dataIndex: ['task', 'name'],
      width: 140,
    },
    {
      title: 'Exception information',
      dataIndex: 'detail',
      customRender: ({ record }) => record.detail ?? '无',
    },
    {
      title: 'Time consuming',
      dataIndex: 'consumeTime',
      width: 80,
      customRender: ({ record }) => <Tag>{record.consumeTime}ms</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      customRender: ({ record }) => {
        const status = ~~record.status;
        return <Tag color={getStatusType(status)}>{getStatusTip(status)}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: 165,
      customRender: ({ record }) => {
        return formatToDateTime(record.createdAt);
      },
    },
  ];
</script>
