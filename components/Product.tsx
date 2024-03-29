import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProductProps} from '../data/products-type';
import {
	useRecoilValue,
	useRecoilState
} from 'recoil';
import { themeState, cartState, favoritesState } from '../atoms';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/material/styles';
import { buildCartItem, setParsedCartState, getDefaultImage } from "../utils";
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';

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

export default function Product({ details }: DetailsProps) {

	const theme = useRecoilValue<'light' | 'dark'>(themeState);
	const [cartValue, setCartValue] = useRecoilState(cartState);
	const [favorites, setFavorites] = useRecoilState<string[]>(favoritesState);
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
	
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

	const addToFavorites = (product: ProductProps) => () => {
		setFavorites([...favorites, product.id]);
	}

	React.useEffect(()=>{
		setTimeout(() => {
			setIsLoaded(true);
		}, 2000);
	}, [])

	return (
		<>
			{!isLoaded && <Skeleton sx={{
				display: 'inline-block',
				position: 'relative',
				m: 1,
			}} variant="rectangular" width={345} height={345} />}
			<Card sx={{
				maxWidth: 345,
				bgcolor: 'background.default',
				color: 'text.primary',
				m: 1,
				display:  !isLoaded ? 'none' : 'inline-block',
				position: 'relative',
				':hover': {
					boxShadow: 20, // theme.shadows[20]
				}
			}}
				elevation={5}>
				<ProductActions>
					<IconButton size="large" aria-label="Add to Cart" color="inherit"
						onClick={() => addToCart(details)} >
						<AddShoppingCartIcon />
					</IconButton>
					<IconButton size="large" aria-label="Favorite" color="inherit"
						onClick={addToFavorites(details)}
						disabled={favorites.indexOf(details.id) !== -1}>
						<FavoriteIcon />
					</IconButton>
				</ProductActions>
				{/* Image */}
				<Link href={`/product/[slug]`} as={`/product/${details.slug}`}>
					<a>
						<img
							alt={details.name}
							style={{
								height: "345px",
								width: "345px"
							}}
							src={getDefaultImage(details.images)}
							// onLoad= {() => setIsLoaded(true)}
						/>
						<CardContent sx={{ p: 0, mt: -15 }}>
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
		</>
	);
}
