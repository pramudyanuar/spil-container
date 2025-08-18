import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Trash2, 
  Edit3,
  Copy,
  Settings,
  Plus,
  ChevronDown
} from 'lucide-react'
import type { Product, ProductGroup } from '@/types/product'
import { productTypeIcons, colorOptions } from '@/constants/app'

interface ProductGroupComponentProps {
  group: ProductGroup
  onDeleteGroup: (groupId: string) => void
  onAddProduct: (groupId: string) => void
  onUpdateProduct: (groupId: string, productId: string, updates: Partial<Product>) => void
  onDeleteProduct: (groupId: string, productId: string) => void
  onDuplicateProduct: (groupId: string, productId: string) => void
}

export function ProductGroupComponent({ 
  group, 
  onDeleteGroup, 
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onDuplicateProduct
}: ProductGroupComponentProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Group Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <span className="font-medium">{group.name}</span>
          <Edit3 className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteGroup(group.id)}
            className="text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 text-sm text-gray-500 border-b pb-2">
        <div>Type</div>
        <div className="col-span-2">Product Name</div>
        <div>Length / Diameter</div>
        <div>Width</div>
        <div>Height</div>
        <div>Weight</div>
        <div>Quantity</div>
        <div>Color</div>
        <div>Stack</div>
        <div></div>
      </div>

      {/* Products */}
      {group.products.map((product) => {
        const IconComponent = productTypeIcons[product.type]
        return (
          <div key={product.id} className="grid grid-cols-12 gap-2 items-center py-2">
            {/* Type */}
            <div className="flex justify-center">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>

            {/* Product Name */}
            <div className="col-span-2">
              <Input
                value={product.name}
                onChange={(e) => onUpdateProduct(group.id, product.id, { name: e.target.value })}
                className="h-8"
              />
            </div>

            {/* Length/Diameter */}
            <div className="relative">
              <Input
                type="number"
                value={product.length}
                onChange={(e) => onUpdateProduct(group.id, product.id, { length: parseInt(e.target.value) })}
                className="h-8 pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
            </div>

            {/* Width */}
            <div className="relative">
              <Input
                type="number"
                value={product.width}
                onChange={(e) => onUpdateProduct(group.id, product.id, { width: parseInt(e.target.value) })}
                className="h-8 pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
            </div>

            {/* Height */}
            <div className="relative">
              <Input
                type="number"
                value={product.height}
                onChange={(e) => onUpdateProduct(group.id, product.id, { height: parseInt(e.target.value) })}
                className="h-8 pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
            </div>

            {/* Weight */}
            <div className="relative">
              <Input
                type="number"
                value={product.weight}
                onChange={(e) => onUpdateProduct(group.id, product.id, { weight: parseInt(e.target.value) })}
                className="h-8 pr-6"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
            </div>

            {/* Quantity */}
            <div>
              <Input
                type="number"
                value={product.quantity}
                onChange={(e) => onUpdateProduct(group.id, product.id, { quantity: parseInt(e.target.value) })}
                className="h-8"
              />
            </div>

            {/* Color */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full border-2 border-gray-200">
                    <div 
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: product.color }}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {colorOptions.map((color) => (
                    <DropdownMenuItem
                      key={color.value}
                      onClick={() => onUpdateProduct(group.id, product.id, { color: color.value })}
                      className="flex items-center gap-2"
                    >
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stack */}
            <div className="flex justify-center">
              <button
                onClick={() => onUpdateProduct(group.id, product.id, { canStack: !product.canStack })}
                className={`w-6 h-6 rounded border flex items-center justify-center ${
                  product.canStack ? 'bg-blue-500 text-white' : 'border-gray-300'
                }`}
              >
                {product.canStack && <span className="text-xs">✓</span>}
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicateProduct(group.id, product.id)}>
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDeleteProduct(group.id, product.id)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )
      })}

      {/* Add Product Button */}
      <Button 
        variant="ghost" 
        onClick={() => onAddProduct(group.id)}
        className="text-blue-500 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4" />
        Add product
      </Button>
    </div>
  )
}
