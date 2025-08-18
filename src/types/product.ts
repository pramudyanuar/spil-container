export interface Product {
  id: string
  type: 'box' | 'sack' | 'big-bag'
  name: string
  length: number
  width: number
  height: number
  weight: number
  quantity: number
  color: string
  canStack: boolean
}

export interface ProductGroup {
  id: string
  name: string
  products: Product[]
}

export type ProductType = 'box' | 'sack' | 'big-bag'
