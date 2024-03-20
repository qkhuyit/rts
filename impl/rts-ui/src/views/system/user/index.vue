<template>
  <SplitPanel>
    <template #left-content>
      <DeptTree @select="onTreeSelect" @init="onDeptTreeInitData" />
    </template>
    <template #right-content>
      <DynamicTable
        header-title="User Management"
        show-index
        title-tooltip="Please do not delete users at will to avoid affecting the use of other users."
        :data-request="loadTableData"
        :columns="columns"
        :scroll="{ x: 2000 }"
        :row-selection="rowSelection"
      >
        <template v-if="isCheckRows" #title>
          <Alert class="w-full" type="info" show-icon>
            <template #message>
              {{ isCheckRows }} items selected
              <a-button type="link" @click="rowSelection.selectedRowKeys = []"
                >Cancel selection</a-button
              >
            </template>
          </Alert>
        </template>
        <template #toolbar>
          <a-button
            type="primary"
            :disabled="!$auth('system:user:create')"
            @click="openUserModal({})"
          >
            <Icon icon="ant-design:plus-outlined" /> New
          </a-button>
          <a-button
            type="error"
            :disabled="!isCheckRows || !$auth('system:user:delete')"
            @click="delRowConfirm(rowSelection.selectedRowKeys)"
          >
            <Icon icon="ant-design:delete-outlined" /> Delete
          </a-button>
        </template>
      </DynamicTable>
    </template>
  </SplitPanel>
</template>

<script setup lang="tsx">
  import { ref, computed } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal, Alert } from 'ant-design-vue';
  import { userSchemas } from './formSchemas';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import DeptTree from './DeptTree.vue';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import { SplitPanel } from '@/components/basic/split-panel';
  import { useTable } from '@/components/core/dynamic-table';
  import Api from '@/api/';
  import { useFormModal } from '@/hooks/useModal/';
  import { findPath } from '@/utils/common';

  defineOptions({
    name: 'SystemUser',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({ formProps: { autoSubmitOnEnter: true } });
  const [showModal] = useFormModal();

  const selectedDeptId = ref<number>();
  const deptTree = ref<any[]>([]);

  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      rowSelection.value.selectedRowKeys = selectedRowKeys;
    },
  });

  // Whether the table row is checked
  const isCheckRows = computed(() => rowSelection.value.selectedRowKeys.length);

  const loadTableData = async (params: LoadDataParams) => {
    const data = await Api.systemUser.userList({
      ...params,
      deptId: selectedDeptId.value,
    });
    rowSelection.value.selectedRowKeys = [];
    return data;
  };

  /**
   * @description Open the operating user pop-up window
   */
  const openUserModal = async (record: Partial<TableListItem> = {}) => {
    const { userCreate, userUpdate } = Api.systemUser;
    const isUpdate = Boolean(record.id);

    const [formRef] = await showModal({
      modalProps: {
        title: `${isUpdate ? '编辑' : '新增'}用户`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑用户', values);
          values.id = record.id;
          if (record.id) {
            await userUpdate({ id: record.id }, values);
          } else {
            await userCreate(values);
          }
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: userSchemas,
        autoSubmitOnEnter: true,
      },
    });

    if (record.id) {
      const { roles, dept } = await Api.systemUser.userRead({ id: record.id });
      formRef?.setFieldsValue({
        ...record,
        deptId: dept.id,
        roleIds: roles.map((item) => item.id),
      });

      formRef?.updateSchema([
        { field: 'username', componentProps: { disabled: true } },
        { field: 'password', required: false },
      ]);
    } else {
      formRef?.updateSchema([
        { field: 'username', componentProps: { disabled: false } },
        {
          field: 'password',
          required: true,
          defaultValue: 'a123456',
          componentProps: { placeholder: '请输入' },
        },
      ]);
    }

    formRef?.updateSchema([
      {
        field: 'deptId',
        componentProps: {
          treeDefaultExpandedKeys: findPath(deptTree.value, formRef?.getFieldsValue().deptId) || [],
          treeData: deptTree.value,
        },
      },
    ]);
  };

  /**
   * @description table delete row
   */
  const delRowConfirm = async (userId: number | number[]) => {
    const { userDelete } = Api.systemUser;
    if (Array.isArray(userId)) {
      Modal.confirm({
        title: 'Are you sure you want to delete the selected user ?',
        icon: <ExclamationCircleOutlined />,
        centered: true,
        onOk: async () => {
          await userDelete({ id: userId.join(',') });
          dynamicTableInstance?.reload();
        },
      });
    } else {
      await userDelete({ id: userId }).finally(dynamicTableInstance?.reload);
    }
  };

  const onTreeSelect = (id: number) => {
    selectedDeptId.value = id;
    dynamicTableInstance?.reload();
  };
  const onDeptTreeInitData = (treeData) => {
    deptTree.value = treeData;
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: 'Action',
      width: 80,
      dataIndex: 'ACTION',
      fixed: 'right',
      actions: ({ record }) => [
        {
          icon: 'ant-design:edit-outlined',
          tooltip: 'Edit user profile',
          auth: {
            perm: 'system:user:update',
            effect: 'disable',
          },
          onClick: () => openUserModal(record),
        },
        {
          icon: 'ant-design:delete-outlined',
          color: 'red',
          tooltip: 'Delete this account',
          auth: 'system:user:delete',
          popConfirm: {
            title: 'Are you sure you want to delete ?',
            placement: 'left',
            onConfirm: () => delRowConfirm(record.id),
          },
        },
      ],
    },
  ];
</script>

<style></style>
