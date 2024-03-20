import type { FormSchema } from '@/components/core/schema-form/';

export const groupSchemas: FormSchema<API.RoleDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: 'Role Name',
    rules: [{ required: true, type: 'string' }],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'value',
    component: 'Input',
    label: 'Role Value',
    rules: [{ required: true, type: 'string' }],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: 'Remark',
  },
  {
    field: 'menuIds',
    component: 'Tree',
    label: 'Permissions',
    componentProps: {
      checkable: true,
      vModelKey: 'checkedKeys',
      fieldNames: {
        title: 'name',
        key: 'id',
      },
      style: {
        height: '350px',
        paddingTop: '5px',
        overflow: 'auto',
        borderRadius: '6px',
        border: '1px solid #dcdfe6',
        resize: 'vertical',
      },
    },
  },
];
