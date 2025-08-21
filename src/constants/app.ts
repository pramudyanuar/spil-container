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
  box: 'Kotak',
  'big-bag': 'Karung Besar',
  sack: 'Karung',
  barrel: 'Tong',
  roll: 'Gulungan'
}

export const colorOptions = [
  { value: '#3A9542', name: 'Hijau' },
  { value: '#ec4899', name: 'Merah Muda' },  
  { value: '#3b82f6', name: 'Biru' },
  { value: '#f59e0b', name: 'Oranye' },
  { value: '#ef4444', name: 'Merah' },
  { value: '#8b5cf6', name: 'Ungu' }
]

export const stepConfiguration = [
  { id: 1, label: "Produk" },
  { id: 2, label: "Container & Truk" },
  { id: 3, label: "Hasil Stuffing" },
]
