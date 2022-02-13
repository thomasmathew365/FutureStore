import type { NextPage } from 'next';
import useSWR from 'swr'
import { fetcher } from '../utils';
import { ProductProps } from '../data/products-type';
import Product from '../components/Product';
import Container from '@mui/material/Container';
import {
	useRecoilValue
} from 'recoil';
import { themeState } from '../atoms';
import { styled } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => {
	return ({
		backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.grey['900']
	})
});

const Products: NextPage = () => {

	const theme = useRecoilValue<'light' | 'dark'>(themeState);
	const searchScreenBG = theme === 'light' ? 'background.default' : 'grey.900';
	const { data, error } = useSWR('/api/product', fetcher);

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	return (
		<SearchContainer >
			<Container maxWidth="xl" sx={{
				bgcolor: searchScreenBG,
				p: 5,
			}}>
				{data.map((product: ProductProps, k: number) => (
					// <Link href={`/product/[slug]`} as={`/product/${product.slug}`} key={`searchitem-${k}`}>
					// 	<a>
					<Product
						key={`searchitem-${k}`}
						details={product}
					/>
					// 	</a>
					// </Link>

				))}
			</Container>
		</SearchContainer>
	);
};

export default Products;
