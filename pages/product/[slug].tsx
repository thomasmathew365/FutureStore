import { useRouter } from 'next/router';
import * as React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { fetcher, setParsedCartState } from '../../utils';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import { Image as ImageProps } from '../../data/products-type';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState, cartState } from '../../atoms';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Post: NextPage = () => {
	const { query } = useRouter();
	const { data, error } = useSWR(
		() => query.slug && `/api/product/${query.slug}`,
		fetcher
	);
	const [selectedImage, setSelectedImage] = React.useState<number>(0);
	const [selectedColor, setSelectedColor] = React.useState<number>(0);
	const [selectedSize, setSelectedSize] = React.useState<number>(0);
	const [cartValue, setCartValue] = useRecoilState(cartState);
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 2000);
	}, [])

	const theme = useRecoilValue<'light' | 'dark'>(themeState);

	const typoStyles = {
		color: theme === 'light' ? 'text.primary' : 'common.white',
		p: 1,
		m: 0
	};
	const mainImageTypoStyles = {
		color: theme === 'light' ? 'text.primary' : 'common.white',
		bgcolor: theme === 'light' ? 'grey.200' : 'grey.900',
		display: 'inline-block',
		p: 1,
		m: 0
	};
	const ProductInfoContainer = styled('div')(({ theme }) => {
		return {
			minHeight: '100vh'
		};
	});

	if (error) return <div>{error.message}</div>;
	if (!data) return <div>Loading...</div>;

	const colors = data?.options[0]?.values;
	const sizes = data?.options[1]?.values;

	const onImageClick = (key: number) => () => {
		setSelectedImage(key);
	};

	const addToCart = (cartItem: string) => () => {
		setCartValue(setParsedCartState(cartItem, cartValue));
	}

	const onImageNext = () => {
		if (selectedImage + 1 > data.images.length - 1) {
			setSelectedImage(0);
		} else {
			setSelectedImage(selectedImage + 1);
		}
	};

	const onImagePrevious = () => {
		if (selectedImage - 1 < 0) {
			setSelectedImage(data.images.length - 1);
		} else {
			setSelectedImage(selectedImage - 1);
		}
	};

	const renderAltImages = () => {
		return data.images.map((image: ImageProps, k: number) => {
			return (
				<Grid item xs={4} sm={4} md={4} lg={4} key={k} sx={{ display: 'inline-block' }}>
					{!isLoaded && <Skeleton sx={{
						display: 'inline-block',
						height: 200,
						width: '100%'
					}} variant="rectangular" />}
					<CardMedia
						component="img"
						alt={data.name}
						image={image.url}
						height="200"
						sx={{
							objectFit: 'contain',
							bgcolor: k === selectedImage ? '#82ffa1' : '#430089',
							cursor: 'pointer',
							display: !isLoaded ? 'none' : 'inline-block'
						}}
						onClick={onImageClick(k)}
					/>
				</Grid>
			);
		});
	};

	const renderColors = () => {
		return colors && colors
			.map((edge: any, k: number) => {
				return (<Box
					key={k}
					onClick={() => setSelectedColor(k)}
					sx={{
						bgcolor: edge.hexColors[0],
						m: 2, height: '40px', width: '40px',
						borderRadius: 5,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						cursor: 'pointer',
						border: '1px solid black'
					}} >
					{selectedColor === k && <DoneIcon
						sx={{ color: edge.hexColors[0] === '#000000' ? '#FFFFFF' : '#000000' }}
					/>}
				</Box>
				)
			})
	}

	const renderSizes = () => {
		return sizes && sizes
			.map((edge: any, k: number) => {
				return (<Box
					onClick={() => setSelectedSize(k)}
					key={k}
					sx={{
						bgcolor: '#000000',
						m: 2, height: '40px',
						width: '40px',
						borderRadius: 5,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#FFFFFF',
						border: selectedSize === k ? `1px solid #fff` : ``,
						cursor: 'pointer'
					}} >{edge.label}</Box>)
			})
	}

	const renderMainImageBox = () => {
		return (
			<Grid item xs={12} sm={12} md={8} sx={{ pt: 0 }} >
				{!isLoaded && <Skeleton sx={{
					display: 'inline-block',
					position: 'relative',
					height: 545,
					width: '100%'
				}} variant="rectangular" />}
				<Box sx={{ display: !isLoaded ? 'none' : 'block' }}>

					<div style={{ position: 'relative' }}>
						<CardMedia
							component="img"
							alt={data.name}
							height="545"
							image={data.images[selectedImage].url}
							sx={{
								objectFit: 'contain',
							}}
							style={{
								background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
							}}
						/>
						<Box sx={{ position: 'absolute', bottom: '0' }}>
							<div>
								<Typography gutterBottom variant="h6" component="div" align="left" sx={{
									...mainImageTypoStyles,
								}}>
									{`$ ${data.price.value}`}
								</Typography>
							</div>
							<Typography gutterBottom variant="h6" component="div" align="left" sx={{
								...mainImageTypoStyles,
							}}>
								{`$ ${data.name}`}
							</Typography>
						</Box>
					</div>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginTop: '-80px',
						}}
					>
						<IconButton size="large" color="inherit" onClick={onImagePrevious}>
							<ChevronLeftIcon sx={{ m: 2, mr: 4 }} />
						</IconButton>
						<IconButton size="large" color="inherit" onClick={onImageNext}>
							<ChevronRightIcon sx={{ m: 2 }} />
						</IconButton>
					</Box>
				</Box>

				<Box sx={{ display: 'flex' }}>

					{renderAltImages()}
				</Box>
			</Grid>
		)
	}

	const renderAccordions = () => {
		return (
			<>
				<Accordion sx={{ mb: 5 }} expanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Care</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							This is a limited edition production run. Printing starts when the drop ends.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion expanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1b-content"
						id="panel1b-header"
					>
						<Typography>Details</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due to COVID-19.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</>
		);
	}

	const renderProductDetails = () => {
		return (
			<Grid item xs={12} sm={12} md={4} sx={{ p: 2 }}>
				<Typography gutterBottom variant="h5" component="div" align="left" sx={typoStyles}>
					{'Color'}
				</Typography>
				<Box sx={{ display: 'flex' }}>
					{renderColors()}
				</Box>
				<Typography gutterBottom variant="h5" component="div" align="left" sx={typoStyles}>
					{sizes && 'Size'}
				</Typography>
				<Box sx={{ display: 'flex' }}>
					{renderSizes()}
				</Box>
				<Typography gutterBottom variant="body2" component="div" align="left" sx={typoStyles}>
					<span dangerouslySetInnerHTML={{ __html: data.description }}></span>
				</Typography>
				<Button
					sx={{ width: '100%', mb: 10, mt: 5 }}
					variant="contained"
					color="secondary"
					size="large"
					onClick={addToCart(`${data.id}_${colors[selectedColor].label}${sizes ? `_${sizes[selectedSize].label}` : ``}`)}
				>
					{'Add to Cart'}
				</Button>
				{renderAccordions()}
			</Grid>
		);
	}

	return (
		<ProductInfoContainer>
			<Grid container sx={{ mt: 0, pt: 0 }}>
				{renderMainImageBox()}
				{renderProductDetails()}
			</Grid>
		</ProductInfoContainer>
	);
};

export default Post;
