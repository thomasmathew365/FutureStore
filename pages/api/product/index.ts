import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../data/products';
import { ProductProps } from '../../../data/products-type';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductProps[]>
) {  
  res.status(200).json(products)
}
