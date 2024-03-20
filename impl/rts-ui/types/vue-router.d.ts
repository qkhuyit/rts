import { type RouteMeta as VRouteMeta } from 'vue-router';
import { type PermissionType } from '@/permission/permCode/';
import { type LocaleType } from '@/locales/config';

declare global {
  type Title18n = {
    [p in LocaleType]: string;
  };
}

declare module 'vue-router' {
  interface RouteMeta extends VRouteMeta {
    /** Title */
    title: string | Title18n;
    /** Current menu type 0: Directory | 1: Menu | 2: Permissions */
    type?: 0 | 1 | 2;
    /** Current routing permissions */
    perms?: PermissionType[];
    /** Do you need caching? */
    keepAlive?: boolean;
    /** Current route namePath ancestor name collection */
    namePath?: string[];
    /** The full path where the current route is located */
    fullPath?: string;
    /** Whether to pin it to the tab bar */
    affix?: boolean;
    /** menu icon */
    icon?: string;
    /** Current page switching animation */
    transitionName?: string | false;
    /** @name Hide child nodes in menu */
    hideChildrenInMenu?: boolean;
    /** Don't show in menu */
    hideInMenu?: boolean;
    /** Don't show in breadcrumbs */
    hideInBreadcrumb?: boolean;
    /** Do not display in tabs */
    hideInTabs?: boolean;
    /** Set the menu item highlighted for the current route. The value is route fullPath or route name. It is generally used on the details page. */
    activeMenu?: string;
    /** Menu sort number */
    orderNo?: number;
    /** Whether to external link */
    isExt?: boolean;
    /** How to open external links
     * 1: New window opens
     * 2: Embed iframe
     */
    extOpenMode?: 1 | 2;
  }
}
