import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ThemeToggle from './ThemeToggle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { themeState } from '../atoms';
import CartDrawer from './CartDrawer';

export default function Header() {
  const theme = useRecoilValue<'light' | 'dark'>(themeState);
  const appBarBG = theme === 'light' ? 'primary.light' : 'grey.900';

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{ bgcolor: appBarBG }}>
        <Toolbar>
          <Link href={`/search`}>
            <a>
              <StorefrontIcon />
              {'Future Store'}
            </a>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <CartDrawer />
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
