import { Package, ShoppingBag, Drum, Cylinder } from 'lucide-react'
import type { ProductType } from '@/types/product'

export const productTypeIcons: Record<ProductType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  box: Package,
  'big-bag': ShoppingBag,
  sack: ShoppingBag,
  barrel: Drum,
  roll: Cylinder
}

export const productTypeLabels: Record<ProductType, string> = {
  box: 'Box',
  'big-bag': 'Big Bags',
  sack: 'Sacks',
  barrel: 'Barrels',
  roll: 'Roll'
}

export const colorOptions = [
  { value: '#22c55e', name: 'Green' },
  { value: '#ec4899', name: 'Pink' },  
  { value: '#3b82f6', name: 'Blue' },
  { value: '#f59e0b', name: 'Orange' },
  { value: '#ef4444', name: 'Red' },
  { value: '#8b5cf6', name: 'Purple' }
]

export const stepConfiguration = [
  { id: 1, label: "Products" },
  { id: 2, label: "Containers & Trucks" },
  { id: 3, label: "Stuffing Result" },
]
