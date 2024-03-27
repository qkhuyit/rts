<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="Parameter configuration"
      :data-request="Api.systemParamConfig.paramConfigList"
      :columns="columns"
      bordered
      size="small"
    >
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('system:param-config:create')"
          @click="openMenuModal({})"
        >
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import {
    baseColumns,
    searchFormSchema,
    type TableListItem,
    type TableColumnItem,
  } from './columns';
  import { baseSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';

  defineOptions({
    name: 'SystemParamConfig',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: {
      schemas: searchFormSchema,
    },
  });

  const [showModal] = useFormModal();

  /**
   * @description Open the new/edit popup window
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? 'Edit' : 'New'} Dictionary`,
        width: '50%',
        onFinish: async (values) => {
          if (record.id) {
            await Api.systemParamConfig.paramConfigUpdate({ id: record.id }, values);
          } else {
            await Api.systemParamConfig.paramConfigCreate(values);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: baseSchemas,
      },
    });
    formRef?.setFieldsValue({
      ...record,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemParamConfig.paramConfigDelete({ id: record.id });
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
            perm: 'system:param-config:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: 'Delete',
          auth: 'system:param-config:delete',
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
