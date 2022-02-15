import {
  atom
} from 'recoil';

type ThemeProps = 'light' | 'dark';

export const themeState = atom({
  key: 'themeState',
  default: 'dark' as ThemeProps,
});

export const cartState = atom({
  key: 'cartState',
  default: {} as Record<string, number>,
});

export const favoritesState = atom({
  key: 'favoritesState',
  default: [] as string[],
});