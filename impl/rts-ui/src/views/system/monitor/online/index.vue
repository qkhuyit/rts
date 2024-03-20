<template>
  <DynamicTable
    row-key="tokenId"
    header-title="Online User"
    title-tooltip="This is a real operation, please do not kick other users offline at will."
    :data-source="list"
    :columns
    :loading
    @change="handleChange"
    @search="handleSearch"
    @reload="handleReload"
  >
    <template #toolbar>
      <a-switch
        v-model:checked="realTimeUpdate"
        checked-children="Enable real-time updates"
        un-checked-children="Turn off real-time updates"
      />
    </template>
  </DynamicTable>
</template>

<script setup lang="tsx">
  import { ref, onMounted, watch } from 'vue';
  import { baseColumns, type TableListItem } from './columns';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { Api } from '@/api/';
  import { useSSEStore } from '@/store/modules/sse';

  defineOptions({
    name: 'SystemMonitorOnline',
  });

  let originList: TableListItem[] = [];
  const realTimeUpdate = ref(true);
  const list = ref<TableListItem[]>([]);
  const loading = ref(false);
  const sseStore = useSSEStore();
  const [DynamicTable, dynamicTableInstance] = useTable({ size: 'small' });

  const columns: TableColumn<TableListItem>[] = [
    ...baseColumns,
    {
      title: 'Action',
      width: 80,
      dataIndex: 'ACTION',
      actions: ({ record }) => [
        {
          label: 'Offline',
          auth: 'system:online:kick',
          disabled: record.disable,
          popConfirm: {
            title: 'Are you sure you want to log this user offline?',
            onConfirm: () => handleKick(record),
          },
        },
      ],
    },
  ];

  const handleKick = async (record: TableListItem) => {
    await Api.systemOnline.onlineKick({ tokenId: record.tokenId });
    dynamicTableInstance.reload();
  };

  const handleChange = (...a) => {
    console.log(...a);
  };

  const handleSearch = (params: TableListItem) => {
    const keys = Object.keys(params);
    if (!keys.some((k) => Boolean(params[k]))) {
      handleReload();
      return;
    }
    list.value = originList.filter((item) => {
      return keys.every((k) => !params[k] || item[k].includes(params[k]));
    });
  };

  const handleReload = async () => {
    loading.value = true;
    originList = await Api.systemOnline.onlineList().finally(() => (loading.value = false));
    list.value = originList;
  };

  watch(
    () => sseStore.onlineUserCount,
    () => {
      if (realTimeUpdate.value) {
        handleReload();
      }
    },
  );

  onMounted(() => {
    handleReload();
  });
</script>
