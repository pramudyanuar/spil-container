import { productTypeIcons, productTypeLabels } from '@/constants/app'
import type { ProductType } from '@/types/product'

interface ProductTypeSelectorProps {
  selectedType?: ProductType
  onSelect: (type: ProductType) => void
  onCancel: () => void
}

export function ProductTypeSelector({ selectedType, onSelect, onCancel }: ProductTypeSelectorProps) {
  const productTypes: ProductType[] = ['box', 'big-bag', 'sack', 'barrel', 'roll']

  return (
    <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-xl font-semibold mb-6">1. SELECT CARGO TYPE</h2>
        
        <div className="grid grid-cols-5 gap-4 mb-6">
          {productTypes.map((type) => {
            const IconComponent = productTypeIcons[type]
            const isSelected = selectedType === type
            
            return (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className={`p-4 rounded-lg border-2 transition-all hover:bg-blue-50 hover:border-blue-300 ${
                  isSelected 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent 
                    className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} 
                  />
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {productTypeLabels[type]}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedType && onSelect(selectedType)}
            disabled={!selectedType}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}
