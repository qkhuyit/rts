import type { PermissionType } from '@/permission/permCode';

// declare module '*.vue' {
//     import * as vue from 'vue';
//     export declare const render: vue.RootRenderFunction<Element | DocumentFragment>
// }
declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: (perm: PermissionType) => boolean;
     // Until Vue itself implements related functionality, the only way Volar provides is to use the following method.
     // See: https://github.com/vuejs/language-tools/issues/465#issuecomment-1229166260
     // See: https://github.com/vuejs/core/pull/3399
    vAuth?: PermissionType;
    Reflect: Reflect;
    suspenseStatus: '' | 'pending' | 'resolve' | 'fallback';
  }
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T> = {
  [key: string]: T;
};
