import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState, cartState } from '../atoms';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import { fetcher } from '../utils';
import * as _ from 'lodash';
import CartItem from './CartItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const DrawerContainer = styled('div')(({ theme }) => {
	return {
		width: '100vw',
		padding: '10px',
		overflowX: 'hidden',
		[theme.breakpoints.up('sm')]: {
			width: '24rem',
		},
	};
});

export default function CartDrawer() {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const toggleDrawer = (open: boolean) => () => setIsOpen(open);
	const [cartValue, setCartValue] = useRecoilState(cartState);
	const totalCartValue: number = Object.values(cartValue).length
		? Object.values(cartValue).reduce((total, num) => total + num)
		: 0;
	const { data, error } = useSWR('/api/product', fetcher);
	const [toastOpen, setToastOpen] = React.useState(false);

	const handleClick = () => {
		setToastOpen(true);
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setToastOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	const renderCartItems = () => {
		// Todo Parse cartValue for id, size and color
		return Object.keys(cartValue).map((cartItemID, k) => {
			const productInfo = data[_.findIndex(data, ['id', cartItemID])];
			const cartItemCount = cartValue[cartItemID];
			return (
				<CartItem
					productInfo={productInfo}
					count={cartItemCount}
					id={cartItemID}
				/>
			);
		});
	};

	const renderNoItemsInCartToast = () => {
		return (
			<Snackbar
				open={toastOpen}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				autoHideDuration={6000}
				onClose={handleClose}
				message="There are no items in your cart. Add Some!"
				action={action}
			/>
		);
	};

	return (
		<div>
			{/* <Button onClick={toggleDrawer(true)}>{'anchor'}</Button> */}
			<IconButton
				onClick={totalCartValue > 0 ? toggleDrawer(true) : handleClick}
				size="large"
				aria-label="show 4 new mails"
				color="inherit"
			>
				<Badge badgeContent={totalCartValue} color="secondary">
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
			<Drawer anchor={'right'} open={isOpen} onClose={toggleDrawer(false)}>
				<DrawerContainer>
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
					<Typography
						gutterBottom
						title={'My Cart'}
						variant="h5"
						component="div"
						align="left"
						sx={{ fontWeight: '700', mt: 5, mb: 2 }}
					>
						My Cart
					</Typography>
					{renderCartItems()}
          <Button sx={{width: '100%'}} variant="contained" color="secondary" size="large" onClick={undefined}>{'Proceed to Checkout'}</Button>
				</DrawerContainer>
			</Drawer>
			{renderNoItemsInCartToast()}
		</div>
	);
}
