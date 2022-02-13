import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductProps, Image as ImageProps } from '../data/products-type';
import {
	useRecoilValue,
	useRecoilState
} from 'recoil';
import { themeState, cartState } from '../atoms';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/material/styles';
import { buildCartItem, setParsedCartState } from "../utils";
import Link from 'next/link';

type DetailsProps = {
	details: ProductProps
};

const ProductActions = styled('div')(({ theme }) => {
	return ({
		backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.secondary.dark,
		borderBottomLeftRadius: '10%',
		position: 'absolute',
		right: '0px'
	})
});


const renderTrimmerTitle = (title: string, typoStyles: any) => {
	const titleTrimmed =
		title.length > 20 ? `${title.substring(0, 19)}...` : title;
	return (
		<div>
			<Typography gutterBottom title={title} variant="h5" component="div" align="left"
				sx={typoStyles}>
				{titleTrimmed}
			</Typography>
		</div>
	);
};

const getDefaultImage = (images: ImageProps[]) => {
	return images.filter(image => image.isDefault)[0].url;
};

export default function Product({ details }: DetailsProps) {

	const theme = useRecoilValue<'light' | 'dark'>(themeState);
	const [cartValue, setCartValue] = useRecoilState(cartState);
	const typoStyles = {
		color: theme === 'light' ? 'text.primary' : 'common.white',
		bgcolor: theme === 'light' ? 'grey.200' : 'grey.900',
		p: 1,
		display: 'inline-block',
		m: 0
	}

	const addToCart = (product: ProductProps) => {
		const cartItem = buildCartItem(product, false);
		setCartValue(setParsedCartState(cartItem, cartValue));
	}

	return (
		<Card sx={{
			maxWidth: 345,
			bgcolor: 'background.default',
			color: 'text.primary',
			m: 1,
			display: 'inline-block',
			position: 'relative',
			':hover': {
				boxShadow: 20, // theme.shadows[20]
			}
		}}
			elevation={5}>
			{/* <CardActions> */}
			<ProductActions>
				<IconButton size="large" aria-label="Add to Cart" color="inherit"
					onClick={() => addToCart(details)}>
					<AddShoppingCartIcon />
				</IconButton>
				<IconButton size="large" aria-label="Favorite" color="inherit">
					<FavoriteIcon />
				</IconButton>
			</ProductActions>
			{/* </CardActions> */}
			{/* Image */}
			<Link href={`/product/[slug]`} as={`/product/${details.slug}`}>
				<a>
					<CardMedia
						component="img"
						alt={details.name}
						height="345"
						image={getDefaultImage(details.images)}
					/>
					<CardContent sx={{ p: 0 }}>
						{/* Title */}
						{renderTrimmerTitle(details.name, typoStyles)}
						{/* Price */}
						<div>
							<Typography gutterBottom variant="h6" component="div" align="right" sx={{
								...typoStyles
							}}>
								{`$ ${details.price.value}`}
							</Typography>
						</div>

					</CardContent>
				</a>
			</Link >

		</Card >
	);
}
