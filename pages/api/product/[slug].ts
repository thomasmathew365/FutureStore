import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../data/products';
import { ProductProps } from '../../../data/products-type';

type Data = ProductProps | {
  message: string;
};

export default function personHandler({ query: { slug } }: NextApiRequest,
  res: NextApiResponse<Data>) {
  const filtered = products.filter((p) => p.slug === slug)

  // User with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Product with name: ${slug} not found.` })
  }
}


