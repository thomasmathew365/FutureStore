import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { getDefaultImage } from '../utils';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState, cartState } from '../atoms';
import { ProductProps } from '../data/products-type';

interface CartProps {
	productInfo: ProductProps;
	count: number;
	id: string;
}

export default function CartItem(props: CartProps) {
	const { productInfo, count, id } = props;
	const [cartValue, setCartValue] = useRecoilState(cartState);

	const deleteCartItem = (id: string) => () => {
		let prevState = { ...cartValue };
		delete prevState[id];
		setCartValue(prevState);
	};

	const removeCartItem = (id: string) => () => {
		let prevState = { ...cartValue };
		prevState[id] = prevState[id] - 1;
		setCartValue(prevState);
	};

	const addCartItem = (id: string) => () => {
		let prevState = { ...cartValue };
		prevState[id] = prevState[id] + 1;
		setCartValue(prevState);
	};


	return (
		<Box sx={{ flexGrow: 1, mb: 2, boxShadow: 2 }}>
			<Grid container spacing={1}>
				<Grid item xs={3}>
					<CardMedia
						component="img"
						alt={productInfo.name}
						height="100"
						image={getDefaultImage(productInfo.images)}
						sx={{ bgcolor: 'grey.400' }}
					/>
				</Grid>
				<Grid item xs={6}>
					<Typography
						gutterBottom
						title={productInfo.name}
						variant="body1"
						component="div"
						align="left"
					>
						{productInfo.name}
					</Typography>
					<Stack direction="row" spacing={1}>
						{id.split('_')[1] && <Chip label={`Color: ${id.split('_')[1]}`} variant="outlined" />}
						{id.split('_')[2] && <Chip label={`Size: ${id.split('_')[2]}`} variant="outlined" />}
					</Stack>
				</Grid>
				<Grid item xs={3}>
					<Typography
						gutterBottom
						title={productInfo.name}
						variant="body1"
						component="div"
						align="left"
					>
						{`$ ${productInfo.price.value * count}`}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<IconButton
						size="large"
						aria-label="Remove from Cart"
						title="Remove from Cart"
						color="inherit"
						onClick={deleteCartItem(id)}
					>
						<CancelIcon />
					</IconButton>
				</Grid>
				<Grid item xs={6}>
					<IconButton size="medium" color="inherit" disableRipple>
						<Box sx={{ color: 'text.disabled' }}>{count}</Box>
					</IconButton>
				</Grid>

				<Grid item xs={2}>
					<IconButton
						size="large"
						aria-label="Remove from Cart"
						title="Remove from Cart"
						color="inherit"
						disabled={count === 1}
						onClick={removeCartItem(id)}
					>
						<DoDisturbOnIcon />
					</IconButton>
				</Grid>
				<Grid item xs={2}>
					<IconButton
						size="large"
						aria-label="Add to Cart"
						title="Add to Cart"
						color="inherit"
						onClick={addCartItem(id)}
					>
						<AddCircleIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Box>
	);
}
