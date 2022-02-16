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

const Products: NextPage = () => {

	const theme = useRecoilValue<'light' | 'dark'>(themeState);
	const { data, error } = useSWR('/api/product', fetcher);

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	return (
			<Container maxWidth="xl" sx={{
				p: 1
			}}>
				{data.map((product: ProductProps, k: number) => (
					<Product
						key={`searchitem-${k}`}
						details={product}
					/>
				))}
			</Container>
	);
};

export default Products;
