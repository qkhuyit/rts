import type { Ref } from 'vue';
import type { CustomRenderParams } from './column';
import type { PopconfirmProps } from 'ant-design-vue/es/popconfirm';
import type { ButtonProps, TooltipProps } from 'ant-design-vue/es/components';
import type { TableMethods, UseEditableType } from '../hooks/';
import type { PermissionType } from '@/permission/permCode';
import type { ButtonType } from '@/components/basic/button';

export type ActionItem = Omit<ButtonProps, 'onClick' | 'loading' | 'type'> & {
  onClick?: Fn<CustomRenderParams, any>;
  label?: string;
  color?: string;
  type?: ButtonType;
  loading?: Ref<ButtonProps['loading']> | ButtonProps['loading'];
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // Permission encoding controls whether to display
  // auth?: RoleEnum | RoleEnum[] | string | string[];
  // Whether business control is displayed
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
  /** Set button permissions. If the effect is not passed, the default is disable. */
  auth?:
    | PermissionType
    | {
        perm: PermissionType;
        /** When accessing permissions, the button is invisible or disabled */
        effect?: 'delete' | 'disable';
      };
};

export type PopConfirm = PopconfirmProps & {
  title: string;
  okText?: string;
  cancelText?: string;
  onConfirm: Fn<CustomRenderParams, any>;
  onCancel?: Fn<CustomRenderParams, any>;
  icon?: string;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottomRight';
};

export type TableActionType = {
  /** Refresh and clear, the page number will also be reset, excluding the search form */
  reload: TableMethods['reload'];
  /** Set dynamic table properties */
  setProps: TableMethods['setProps'];
  /** Get remote data */
  fetchData: TableMethods['fetchData'];
  /** Enter editing state */
  startEditable: UseEditableType['startEditable'];
  /** Cancel edit */
  cancelEditable: UseEditableType['cancelEditable'];
  /** Get the value of the edited form */
  getEditFormModel: UseEditableType['getEditFormModel'];
  /** Whether the current line is in editing status */
  isEditable: UseEditableType['isEditable'];
  /** Whether the row editing form is verified or not */
  validateRow: UseEditableType['validateRow'];
};
