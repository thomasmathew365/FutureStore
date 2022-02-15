import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { themeState } from '../atoms';
import CartDrawer from './CartDrawer';
import Favorites from './Favorites';

export default function Header() {
  const theme = useRecoilValue<'light' | 'dark'>(themeState);
  const appBarBG = theme === 'light' ? 'primary.light' : 'grey.900';

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" elevation={15} sx={{ bgcolor: appBarBG }}>
        <Toolbar>
          <Link href={`/search`}>
            <a >
              <Box sx={{ color: theme === 'light' ? 'text.primary' : 'common.white' }}>
                {'Future Store'}

              </Box>
            </a>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <CartDrawer />
            <Favorites />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
