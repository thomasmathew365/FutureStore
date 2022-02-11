import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductProps, Image as ImageProps } from '../../data/products-type';

type DetailsProps = {
	details: ProductProps
};

const renderTrimmerTitle = (title: string) => {
	const titleTrimmed =
		title.length > 20 ? `${title.substring(0, 19)}...` : title;
	return (
		<Typography gutterBottom title={title} variant="h5" component="div" align="center">
			{titleTrimmed}
		</Typography>
	);
};

const getDefaultImage = (images: ImageProps[]) => {
	return images.filter(image => image.isDefault)[0].url;
};


export default function Product({ details }: DetailsProps) {
	return (
		<Card sx={{ maxWidth: 345 }} elevation={0}>
			{/* Image */}
			<CardMedia
				component="img"
				alt={details.name}
				height="340"
				image={getDefaultImage(details.images)}
			/>
			<CardContent>
				{/* Title */}
				{renderTrimmerTitle(details.name)}
				{/* Price */}
				<Typography gutterBottom variant="h6" component="div" align="center">
					{`$ ${details.price.value}`}
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
