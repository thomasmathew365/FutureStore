import {
  atom
} from 'recoil';

type ThemeProps = 'light' | 'dark';

export const themeState = atom({
  key: 'themeState',
  default: 'light' as ThemeProps,
});

export const cartState = atom({
  key: 'cartState',
  default: {} as Record<string, number>,
});