import Product from '../../components/product/product';
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
	const res = await fetch(url)
	const data = await res.json()

	if (res.status !== 200) {
		throw new Error(data.message)
	}
	return data
}

const Post = () => {
	const { query } = useRouter()
	const { data, error } = useSWR(
		() => query.slug && `/api/product/${query.slug}`,
		fetcher
	)
	console.log({ data })
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
