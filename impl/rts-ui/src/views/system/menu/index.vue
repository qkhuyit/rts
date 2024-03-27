<template>
  <DynamicTable header-title="Menu management" :data-request="Api.systemMenu.menuList" :columns="columns">
    <template #afterHeaderTitle>
      <div class="flex gap-2 ml-2">
        <a-button @click="dynamicTableInstance.expandAll">Expand All</a-button>
        <a-button @click="dynamicTableInstance.collapseAll">Collapse all</a-button>
      </div>
    </template>
    <template #toolbar>
      <a-button type="primary" :disabled="!$auth('system:menu:create')" @click="openMenuModal({})">
        New
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="tsx" setup>
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { useMenuSchemas } from './formSchemas';
  import Api from '@/api/';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';

  defineOptions({
    name: 'SysMenu',
  });
  const [DynamicTable, dynamicTableInstance] = useTable({
    pagination: false,
    size: 'small',
    rowKey: 'id',
    bordered: true,
    scroll: { x: window.innerWidth > 2000 ? undefined : 2000 },
  });
  const [showModal] = useFormModal();

  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? 'Edit' : 'New'} Menu`,
        width: 700,
        onFinish: async (values) => {
          record.id && (values.menuId = record.id);
          if (Array.isArray(values.component)) {
            values.component = values.component.join('/');
          }
          if (Array.isArray(values.permission)) {
            values.permission = values.permission.join(':');
          }
          if (values.parentId === -1) {
            Reflect.deleteProperty(values, 'parentId');
          }
          if (record.id) {
            await Api.systemMenu.menuUpdate({ id: record.id }, values);
          } else {
            await Api.systemMenu.menuCreate(values);
          }
          dynamicTableInstance.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: useMenuSchemas(),
      },
    });

    formRef?.setFieldsValue({
      ...record,
      icon: record.icon ?? '',
      parentId: record.parentId ?? -1,
      component: record.component?.split('/'),
    });
    console.log('record', record);
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemMenu.menuDelete({ id: record.id });
    dynamicTableInstance.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: 'Action',
      width: 140,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: 'Edit',
          auth: {
            perm: 'system:menu:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: 'New',
          auth: {
            perm: 'system:menu:create',
            effect: 'disable',
          },
          disabled: record.type === 2,
          onClick: () => openMenuModal({ parentId: record.id }),
        },
        {
          label: 'Delete',
          auth: 'system:menu:delete',
          popConfirm: {
            title: 'Are you sure you want to delete ?',
            placement: 'left',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
