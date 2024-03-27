import AvatarUpload from './AvatarUpload.vue';
import type { FormSchema } from '@/components/core/schema-form/';
import Api from '@/api/';

export const userSchemas: FormSchema<API.UserDto>[] = [
  {
    field: 'avatar',
    component: () => AvatarUpload,
    label: 'Avatar',
  },
  {
    field: 'deptId',
    component: 'TreeSelect',
    label: 'Department',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'roleIds',
    component: 'Select',
    label: 'Role',
    rules: [{ required: true, type: 'array' }],
    componentProps: {
      mode: 'multiple',
      request: async () => {
        const { items = [] } = await Api.systemRole.roleList({});
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'username',
    component: 'Input',
    label: 'User name color',
    rules: [{ required: true }],
  },
  {
    field: 'password',
    label: 'Password',
    component: 'InputPassword',
    componentProps: {
      placeholder: 'Please leave blank if no modification is required.',
    },
  },
  {
    field: 'nickname',
    component: 'Input',
    label: 'Please leave your nickname blank',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: 'Email',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: 'Phone',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: 'Remark',
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: 'Status',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: 'Enable',
          value: 1,
        },
        {
          label: 'Disable',
          value: 0,
        },
      ],
    },
  },
];
/**
 * @description Update user password
 */
export const updatePswSchemas: FormSchema[] = [
  {
    field: 'password',
    component: 'Input',
    label: 'Password',
    rules: [{ required: true, type: 'string' }],
  },
];
/**
 * @description Transfer users to departments
 */
export const transferUserSchemas: FormSchema[] = [
  {
    field: 'departmentId',
    component: 'TreeSelect',
    label: 'Transfer to',
    rules: [{ required: true, type: 'number' }],
  },
];
