import type { FormSchema } from '@/components/core/schema-form/';
import Api from '@/api/';
import { findPath } from '@/utils/common';

export const roleSchemas: FormSchema<API.DeptDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: 'Department Name',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'parentId',
    component: 'TreeSelect',
    label: 'Higher office',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
      request: async ({ schema, formModel }) => {
        const deptTree = await Api.systemDept.deptList({});
        schema.value.componentProps.treeDefaultExpandedKeys = findPath(
          deptTree,
          formModel['parentId'],
        );
        return deptTree;
      },
    },
  },
  {
    field: 'orderNo',
    label: 'Sort',
    component: 'InputNumber',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
  },
];
