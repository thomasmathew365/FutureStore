import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const props2 = {
	id: 1,
	title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
	price: 109.95,
	description:
		'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
	category: "men's clothing",
	image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
	rating: {
		rate: 3.9,
		count: 120,
	},
};

interface ProductProps {
	details: {
		id: number;
		title: string;
		price: number;
		description: string;
		image: string;
	};
}

const renderTrimmerTitle = (title: string) => {
	const titleTrimmed =
		title.length > 20 ? `${title.substring(0, 19)}...` : title;
	return (
		<Typography gutterBottom title={title} variant="h5" component="div" align="center">
			{titleTrimmed}
		</Typography>
	);
};

export default function Product(props: ProductProps) {
	return (
		<Card sx={{ maxWidth: 345 }} elevation={0}>
			{/* Image */}
			<CardMedia
				component="img"
				alt={props.details.title}
				height="340"
				image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
			/>
			<CardContent>
				{/* Title */}
				{renderTrimmerTitle(props.details.title)}
				{/* Price */}
				<Typography gutterBottom variant="h6" component="div" align="center">
					{`₩ ${props.details.price * 1000}`}
				</Typography>
				{/* <Typography gutterBottom variant="h5" component="div">
					Lizard
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography> */}
			</CardContent>
			<CardActions>
				{/* <Button size="small">Share</Button>
				<Button size="small">Learn More</Button> */}
			</CardActions>
		</Card>
	);
}
