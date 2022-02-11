import { useRouter } from 'next/router';
import Product from '../../components/product/product';

const Post = () => {
	const router = useRouter();
	const { slug } = router.query;

	return (
		<div>
			<Product
				details={{
					id: 1,
					title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
					price: 109.95,
					description:
						'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
					image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
				}}
			/>
		</div>
	);
};

export default Post;
