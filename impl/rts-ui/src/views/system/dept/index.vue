<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="Department management"
      :data-request="Api.systemDept.deptList"
      :columns="columns"
      bordered
      size="small"
    >
      <template #afterHeaderTitle>
        <div class="flex gap-2 ml-2">
          <a-button @click="dynamicTableInstance.expandAll">展开全部</a-button>
          <a-button @click="dynamicTableInstance.collapseAll">折叠全部</a-button>
        </div>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('system:dept:create')"
          @click="openMenuModal({})"
        >
          New
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { roleSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';

  defineOptions({
    name: 'SystemDept',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();

  /**
   * @description Open the new/edit popup window
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? 'Edit' : 'New'} Department`,
        width: '50%',
        onFinish: async (values) => {
          if (record.id) {
            await Api.systemDept.deptUpdate({ id: record.id }, values);
          } else {
            await Api.systemDept.deptCreate(values);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: roleSchemas,
      },
    });
    formRef?.setFieldsValue({
      ...record,
      parentId: record.parent?.id,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemDept.deptDelete({ id: record.id });
    dynamicTableInstance?.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: 'Action',
      width: 130,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: 'Edit',
          auth: {
            perm: 'system:dept:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: 'Delete',
          auth: 'system:dept:delete',
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
