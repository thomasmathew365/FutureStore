import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  useRecoilValue,
  useRecoilState
} from 'recoil';
import { themeState, cartState } from '../atoms';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useSWR from 'swr'
import { fetcher } from '../utils';

const DrawerContainer = styled('div')(({ theme }) => {
  return ({
    width: '100vw',
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      width: '22rem'
    }
  })
});


export default function CartDrawer() {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleDrawer = (open: boolean) => () => setIsOpen(open);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const totalCartValue: number = Object.values(cartValue).length ? Object.values(cartValue).reduce((total, num) => total + num) : 0;
  const { data, error } = useSWR('/api/product', fetcher);

  console.log(cartValue);
  
  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>{'anchor'}</Button> */}
      <IconButton onClick={toggleDrawer(true)} size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={totalCartValue} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor={'right'}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerContainer>
        <Typography gutterBottom title={'My Cart'} 
        variant="h5" 
        component="div" 
        align="left"
        sx={{fontWeight: '700'}}
        >
				My Cart
			</Typography>

        </DrawerContainer>
      </Drawer>
    </div>
  );
}
