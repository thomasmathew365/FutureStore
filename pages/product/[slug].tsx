import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';
import { fetcher, getDefaultImage } from '../../utils';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Image as ImageProps } from '../../data/products-type';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState, cartState } from '../../atoms';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const Post = () => {
	const { query } = useRouter();
	const { data, error } = useSWR(
		() => query.slug && `/api/product/${query.slug}`,
		fetcher
	);
	const [selectedImage, setSelectedImage] = React.useState<number>(0);
	const theme = useRecoilValue<'light' | 'dark'>(themeState);
	const ProductInfoContainer = styled('div')(({ theme }) => {
		return {
			backgroundColor:
				theme.palette.mode === 'light'
					? theme.palette.background.default
					: theme.palette.grey['900'],
		};
	});

	if (error) return <div>{error.message}</div>;
	if (!data) return <div>Loading...</div>;

	const onImageClick = (key: number) => () => {
		setSelectedImage(key);
	};

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

	const AltImagesContainer = styled('div')(({ theme }) => {
		return {
			display: 'flex',
			backgroundColor: '#430089',
		};
	});

	const renderAltImages = () => {
		return data.images.map((image: ImageProps, k: number) => {
			return (
				<Grid item xs={4}>
					<CardMedia
						component="img"
						alt={data.name}
						height="245"
						image={image.url}
						sx={{
							objectFit: 'contain',
							bgcolor: k === selectedImage ? '#82ffa1' : '#430089',
							width: '400px',
						}}
						onClick={onImageClick(k)}
					/>
				</Grid>
			);
		});
	};

	return (
		<ProductInfoContainer>
			<Grid container spacing={1} sx={{ mt: 0, pt: 0 }}>
				<Grid
					item
					xs={12}
					md={8}
					sx={{ pt: 0 }}
					style={{
						background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
					}}
				>
					<CardMedia
						component="img"
						alt={data.name}
						height="645"
						image={data.images[selectedImage].url}
					/>
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
					<Grid
						container
						spacing={0}
						sx={{ bgcolor: '#430089', height: '245px', overflow: 'hidden' }}
					>
						{renderAltImages()}
					</Grid>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography gutterBottom variant="h5" component="div" align="left">
						{'Color'}
					</Typography>
					<Typography gutterBottom variant="h5" component="div" align="left">
						{'Size'}
					</Typography>
				</Grid>
			</Grid>
		</ProductInfoContainer>
	);
};

export default Post;
