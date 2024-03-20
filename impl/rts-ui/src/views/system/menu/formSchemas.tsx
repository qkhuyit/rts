import { h } from 'vue';
import type { FormSchema } from '@/components/core/schema-form/';
import { IconPicker, Icon } from '@/components/basic/icon';
import { asyncRoutes } from '@/router/asyncModules';
import Api from '@/api/';
import { findPath, str2tree } from '@/utils/common';

/** 菜单类型 0: 目录 | 1: 菜单 | 2: 按钮 */
const isDir = (type: API.MenuDto['type']) => type === 0;
const isMenu = (type: API.MenuDto['type']) => type === 1;
const isButton = (type: API.MenuDto['type']) => type === 2;

export const useMenuSchemas = (): FormSchema<API.MenuDto>[] => [
  {
    field: 'type',
    component: 'RadioGroup',
    label: 'Menu type',
    defaultValue: 0,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      options: [
        {
          label: 'Table of contents',
          value: 0,
        },
        {
          label: 'Menu',
          value: 1,
        },
        {
          label: 'Permissions',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: ({ formModel }) => (isButton(formModel['type']) ? 'Permission name' : 'Node name'),
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'parentId',
    component: 'TreeSelect',
    label: 'Superior node',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      request: async ({ schema, formModel }) => {
        const menuTree = await Api.systemMenu.menuList({});
        const treeDefaultExpandedKeys = [-1].concat(
          findPath(menuTree, formModel['parentId']) || [],
        );
        schema.value.componentProps.treeDefaultExpandedKeys = treeDefaultExpandedKeys;
        return [{ id: -1, name: 'Root directory', children: menuTree }];
      },
      getPopupContainer: () => document.body,
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'path',
    component: 'Input',
    label: 'Routing address',
    vIf: ({ formModel }) => !isButton(formModel['type']),
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'permission',
    component: 'Input',
    label: 'Permissions',
    helpMessage: `Corresponds to the permission characters defined in the controller, such as：@Perm('system:menu:list'))`,
    vIf: ({ formModel }) => !isDir(formModel['type']),
    required: ({ formModel }) => isButton(formModel.type),
    afterSlot: ({ schema, formInstance, formModel }) => {
      if (schema.value.component === 'Input') {
        return h(Icon, {
          icon: 'ant-design:folder-open-outlined',
          title: 'Select permissions',
          class: 'ml-[12px] cursor-pointer',
          onclick: async () => {
            const data = await Api.systemMenu.menuGetPermissions();
            if (typeof formModel['permission'] === 'string') {
              // @ts-ignore
              formModel['permission'] = formModel['permission'].split(':');
            }
            formInstance.updateSchema({
              field: 'permission',
              component: 'Cascader',
              componentProps: {
                displayRender: ({ labels }) => labels.join(':'),
                options: data.reduce((prev, curr) => (str2tree(curr, prev, ':'), prev), []),
              },
            });
          },
        });
      } else {
        return h(Icon, {
          icon: 'ant-design:edit-outlined',
          title: 'Manual entry',
          class: 'ml-[12px] cursor-pointer',
          onclick: () => {
            if (Array.isArray(formModel['permission'])) {
              formModel['permission'] = formModel['permission'].join(':');
            }
            formInstance.updateSchema({
              field: 'permission',
              component: 'Input',
            });
          },
        });
      }
    },
  },
  {
    field: 'component',
    component: 'Cascader',
    label: 'File path',
    vIf: ({ formModel }) => isMenu(formModel['type']) && !formModel['isExt'],
    componentProps: {
      options: Object.keys(asyncRoutes).reduce(
        (prev, curr) => (str2tree(curr, prev, '/'), prev),
        [],
      ),
    },
    rules: [{ required: true, type: 'array' }],
  },
  {
    field: 'icon',
    component: () => IconPicker,
    label: 'Node icon',
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'orderNo',
    component: 'InputNumber',
    label: 'Queue number',
    defaultValue: 255,
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'isExt',
    component: 'RadioGroup',
    label: 'Whether to external link',
    defaultValue: false,
    helpMessage: 'If you choose an external link, the routing address needs to start with `http(s)://`',
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'extOpenMode',
    component: 'RadioGroup',
    label: 'Open method',
    defaultValue: 1,
    vIf: ({ formModel }) => !isButton(formModel['type']) && formModel['isExt'],
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        {
          label: 'open in a new window',
          value: 1,
        },
        {
          label: 'Inline page opens',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'keepAlive',
    component: 'RadioGroup',
    label: 'Whether to cache',
    defaultValue: 0,
    vIf: ({ formModel }) => isMenu(formModel['type']),
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
    },
  },
  {
    field: 'show',
    component: 'RadioGroup',
    label: 'Whether to display',
    defaultValue: 1,
    colProps: {
      span: 12,
    },
    helpMessage: 'Routes will be generated, but the left menu is not visible',
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
    },
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'activeMenu',
    component: 'Input',
    label: 'Highlight menu item',
    colProps: {
      span: 12,
    },
    helpMessage: 'The value is a certain node name (you can set the menu item highlighted by the current route, mostly used on the details page)',
    componentProps: {
      placeholder: 'The menu item that needs to be highlighted (node name)',
    },
    vIf: ({ formModel }) => !formModel['show'] && !isButton(formModel['type']),
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioGroup',
    defaultValue: 1,
    helpMessage: 'Routes will not be generated and the left menu is not visible.',
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
  },
];
