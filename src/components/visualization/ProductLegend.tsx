import type { ProductType } from '@/types/product'

interface ProductLegendProps {
  productTypes: ProductType[]
}

const PRODUCT_COLORS: Record<ProductType, string> = {
  box: '#4f46e5',      // Indigo
  'big-bag': '#dc2626', // Red
  sack: '#059669',      // Emerald
  barrel: '#d97706',    // Amber
  roll: '#7c3aed',      // Violet
}

const PRODUCT_LABELS: Record<ProductType, string> = {
  box: 'Box',
  'big-bag': 'Big Bag',
  sack: 'Sack',
  barrel: 'Barrel',
  roll: 'Roll',
}

export function ProductLegend({ productTypes }: ProductLegendProps) {
  if (productTypes.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Product Types</h4>
      <div className="flex flex-wrap gap-3">
        {productTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: PRODUCT_COLORS[type] }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {PRODUCT_LABELS[type]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <p>• Drag to rotate • Scroll to zoom • Right-click to pan</p>
      </div>
    </div>
  )
}
