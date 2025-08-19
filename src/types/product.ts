export interface Product {
  id: string
  type: 'box' | 'big-bag' | 'sack' | 'barrel' | 'roll'
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

export type ProductType = 'box' | 'big-bag' | 'sack' | 'barrel' | 'roll'
