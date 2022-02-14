import { ProductProps, Image } from './data/products-type';

type CartProps = {
  id: string,
  size: string,
  color: string
};

export const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export const buildCartItem = (product: ProductProps, isDetailed: boolean) => {
  let cartItem: CartProps;
  if (isDetailed) {

  } else {
    return `${product.id}`;
    // return `${cartItem.id}${cartItem.size ? `_${cartItem.size}` : ``}${cartItem.color ? `_${cartItem.color}` : ``}`
  }
  return '';
}

export const setParsedCartState = (cartItem: string, cartState: Record<string, number>) => {
  const cartStateClone = JSON.parse(JSON.stringify(cartState));
  if (cartStateClone[cartItem]) {
    cartStateClone[cartItem]++;
  } else {
    cartStateClone[cartItem] = 1;
  }
  return cartStateClone;
}

export const getDefaultImage = (images: Image[]) => {
	return images.filter(image => image.isDefault)[0].url;
};