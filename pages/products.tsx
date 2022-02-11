import type { NextPage } from 'next';
import Link from 'next/link';

const Products: NextPage = () => {
	return (
		<div>
			<ul>
				<h2>Product List</h2>
				<li>
					<Link href="/product/one">
						<a>one</a>
					</Link>
				</li>
				<li>
					<Link href="/product/two">
						<a>two</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Products;
