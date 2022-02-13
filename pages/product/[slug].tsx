import Product from '../../components/Product';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../utils';

const Post = () => {
	const { query } = useRouter()
	const { data, error } = useSWR(
		() => query.slug && `/api/product/${query.slug}`,
		fetcher
	)
	if (error) return <div>{error.message}</div>
	if (!data) return <div>Loading...</div>

	return (
		<div>
			<Product
				details={data}
			/>
		</div>
	);
};

export default Post;
