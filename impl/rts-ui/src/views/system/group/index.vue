<template>
  <DynamicTable
    row-key="id"
    header-title="Group Management"
    title-tooltip="Super administrators have access to all resources by default and do not support modification."
    :data-request="Api.group.groupList"
    :columns="columns"
    bordered
    size="small"
    :search="false"
  >
    <template #toolbar>
      <a-button type="primary" :disabled="!$auth('system:group:create')" @click="openMenuModal({})">
        New
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="ts" setup>
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { groupSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';

  defineOptions({
    name: 'SystemPermissionRole',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();

  const getCheckedKeys = (checkedList: number[], menus: API.MenuItemInfo[], total = []) => {
    return menus.reduce<number[]>((prev, curr) => {
      if (curr.children?.length) {
        getCheckedKeys(checkedList, curr.children, total);
      } else {
        if (checkedList.includes(curr.id)) {
          prev.push(curr.id);
        }
      }
      return prev;
    }, total);
  };

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? 'Edit' : 'New'} Group`,
        width: '50%',
        onFinish: async (values) => {
          record.id && (values.roleId = record.id);
          const menusRef = formRef?.compRefMap.get('menuIds')!;
          const params = {
            ...values,
            menuIds: [...menusRef.halfCheckedKeys, ...menusRef.checkedKeys],
          };
          if (record.id) {
            await Api.systemRole.roleUpdate({ id: record.id }, params);
          } else {
            await Api.systemRole.roleCreate(params);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: groupSchemas,
      },
    });

    const menuTreeData = await Api.systemMenu.menuList({});

    formRef?.updateSchema([
      {
        field: 'menuIds',
        componentProps: { treeData: menuTreeData },
      },
    ]);
    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const roleInfo = await Api.systemRole.roleInfo({ id: record.id });

      formRef?.setFieldsValue({
        ...record,
        menuIds: getCheckedKeys(roleInfo.menuIds, menuTreeData),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemRole.roleDelete({ id: record.id });
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
            perm: 'system:group:update',
            effect: 'disable',
          },
          onClick: () => {
            openMenuModal(record);
          },
        },
        {
          label: 'Delete',
          auth: 'system:group:delete',
          popConfirm: {
            title: 'Are you sure you want to delete group ？',
            placement: 'left',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
