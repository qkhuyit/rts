import { theme } from 'ant-design-vue';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const themeStyle = [
  {
    label: 'Bright theme style',
    value: 'light',
  },
  {
    label: 'Dark theme style',
    value: 'dark',
  },
  {
    label: 'Dark mode',
    value: 'realDark',
  },
] as const;

/** theme color */
export const themeColor = {
  light: defaultAlgorithm,
  dark: defaultAlgorithm,
  realDark: darkAlgorithm,
} as const;
export type ThemeColor = keyof typeof themeColor;

/** theme color */
export const themeColors = [
  {
    title: 'Dawn blue (default)',
    key: 'techBlue',
    value: '#1677FF',
  },
  {
    title: 'Dusk',
    key: 'dust',
    value: '#F5222D',
  },
  {
    title: 'Volcano',
    key: 'volcano',
    value: '#FA541C',
  },
  {
    title: 'Sunset',
    key: 'sunset',
    value: '#FAAD14',
  },
  {
    title: 'Cyan',
    key: 'cyan',
    value: '#13C2C2',
  },
  {
    title: 'Green',
    key: 'green',
    value: '#52C41A',
  },
  {
    title: 'Geek Blue',
    key: 'geekblue',
    value: '#2F54EB',
  },
  {
    title: 'Purple',
    key: 'purple',
    value: '#722ED1',
  },
] as const;

/** Navigation mode (layout mode) */
export const layouts = [
  {
    label: 'Side menu layout',
    value: 'sidemenu',
  },
  {
    label: 'Top menu layout',
    value: 'topmenu',
  },
] as const;
