import type { FormSchema } from '@/components/core/schema-form/';

export const baseSchemas: FormSchema<API.ParamConfigDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: 'Name',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'key',
    component: 'Input',
    label: 'Key',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: 'Value',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: 'Remark',
    colProps: {
      span: 24,
    },
    required: true,
  },
];
