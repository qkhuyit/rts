import type { ModalProps } from 'ant-design-vue';

// Ordinary modal box
export interface HookModalProps extends Partial<ModalProps> {
  /** Whether the current modal box is in the App.vue context */
  isAppChild?: boolean;
  content?: string | JSX.Element | (() => JSX.Element);
  closeModal?: () => void;
}

// form modal box
export interface FormModalProps<T extends object = Recordable> extends HookModalProps {
  /**
   * Accept returns a boolean. Returning true will close the pop-up window.
   *
   * @name Called after the form ends
   */
  onFinish?: (formData: Objectable<T>) => Promise<boolean | void>;
  /**
   * Accept returns a boolean. Returning true will close the pop-up window.
   *
   * @name Called when form validation fails
   */
  onFail?: (formData: Objectable<T>) => any;
}
