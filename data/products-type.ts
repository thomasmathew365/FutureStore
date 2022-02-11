export interface ProductProps {
  name: string
  path: string
  brand: any
  description: string
  prices: Prices
  images: Image[]
  variants: Variant[]
  productOptions: ProductOptions
  id: string
  options: any[]
  slug: string
  price: Price2
}

export interface Prices {
  price: Price
  salePrice: any
  retailPrice: any
}

export interface Price {
  value: number
  currencyCode: string
}

export interface Image {
  url: string
  alt: string
  isDefault: boolean
}

export interface Variant {
  id: number
  options: any[]
  defaultImage: any
}

export interface ProductOptions {
  edges: any[]
}

export interface Price2 {
  value: number
  currencyCode: string
}
