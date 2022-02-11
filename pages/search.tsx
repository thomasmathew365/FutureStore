import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr'
import { ProductProps } from '../data/products-type';
import Product from '../components/product/product';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products: NextPage = () => {

	const { data, error } = useSWR('/api/product', fetcher)

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>


	return (
		<div>

			<h2>Product List</h2>
			<CssBaseline />
			<Container fixed>
				{data.map((product: ProductProps) => (

					<Link href={`/product/[slug]`} as={`/product/${product.slug}`}>
						<a>

							<Product
								details={product}
							/>
						</a>
					</Link>

				))}
			</Container>


		</div>
	);
};

export default Products;
