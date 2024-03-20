import {
  editorProps,
  type IPropTypes,
} from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes';
import { plugins as defaultPlugins, toolbar as defaultToolbar } from './constants';
import type { Editor, Events } from 'tinymce';

export interface TinymceProps extends Partial<IPropTypes> {
  height?: string | number;
  width?: string | number;
  showImageUpload?: boolean;
}

export const tinymceProps = {
  ...editorProps,
  init: Object as PropType<IPropTypes['init']>,
  toolbar: {
    type: Array as PropType<IPropTypes['toolbar']>,
    default: defaultToolbar,
  },
  plugins: {
    type: Array as PropType<IPropTypes['plugins']>,
    default: defaultPlugins,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 400,
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 'auto',
  },
};

// https://www.tiny.cloud/docs/integrations/vue/#eventbinding
type __TinymceEvents = {
  [K in keyof Events.EditorEventMap as Uncapitalize<K>]: [
    event: Events.EditorEventMap[K],
    editor: Editor,
  ];
};

/**
 * Why is it written like this here? Because the vue compiler does not support complex types, you need to use the @vue-ignore annotation to skip compilation, otherwise an error will be reported, but in this way vue will not generate emits definitions for us.
 * See details：https://github.com/vuejs/core/issues/8286
 */
export interface TinymceEvents extends /** @vue-ignore */ __TinymceEvents {}
