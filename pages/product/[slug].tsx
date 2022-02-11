import { useRouter } from 'next/router';
import Product from '../../components/product/product';

const Post = () => {
	const router = useRouter();
	const { slug } = router.query;

	return (
		<div>
			<p>Product: {slug}</p>
			<Product />
		</div>
	);
};

export default Post;
