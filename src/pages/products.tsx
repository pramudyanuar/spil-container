import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Import, 
  Download, 
  Package, 
  ShoppingBag, 
  Trash2, 
  Edit3,
  Copy,
  Settings,
  ChevronDown
} from 'lucide-react'
import type { Product, ProductGroup, ProductType } from '@/types/product'

const productTypeIcons: Record<ProductType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  box: Package,
  sack: ShoppingBag,
  'big-bag': ShoppingBag
}

const colorOptions = [
  { value: '#22c55e', name: 'Green' },
  { value: '#ec4899', name: 'Pink' },  
  { value: '#3b82f6', name: 'Blue' },
  { value: '#f59e0b', name: 'Orange' },
  { value: '#ef4444', name: 'Red' },
  { value: '#8b5cf6', name: 'Purple' }
]

export function ProductsPage() {
  const [groups, setGroups] = useState<ProductGroup[]>([
    {
      id: '1',
      name: 'Group #1',
      products: [
        {
          id: '1',
          type: 'box',
          name: 'Boxes 1',
          length: 500,
          width: 400,
          height: 300,
          weight: 10,
          quantity: 80,
          color: '#22c55e',
          canStack: true
        },
        {
          id: '2', 
          type: 'sack',
          name: 'Sacks',
          length: 1000,
          width: 450,
          height: 300,
          weight: 45,
          quantity: 100,
          color: '#ec4899',
          canStack: true
        },
        {
          id: '3',
          type: 'big-bag',
          name: 'Big bags',
          length: 1000,
          width: 1000,
          height: 1000,
          weight: 900,
          quantity: 10,
          color: '#3b82f6',
          canStack: true
        }
      ]
    }
  ])
  const [usePallets, setUsePallets] = useState(false)

  const addGroup = () => {
    const newGroup: ProductGroup = {
      id: Date.now().toString(),
      name: `Group #${groups.length + 1}`,
      products: []
    }
    setGroups([...groups, newGroup])
  }

  const deleteGroup = (groupId: string) => {
    setGroups(groups.filter(g => g.id !== groupId))
  }

  const addProduct = (groupId: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      type: 'box',
      name: 'New Product',
      length: 100,
      width: 100,
      height: 100,
      weight: 1,
      quantity: 1,
      color: '#22c55e',
      canStack: false
    }

    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, products: [...group.products, newProduct] }
        : group
    ))
  }

  const updateProduct = (groupId: string, productId: string, updates: Partial<Product>) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? {
            ...group,
            products: group.products.map(product =>
              product.id === productId ? { ...product, ...updates } : product
            )
          }
        : group
    ))
  }

  const deleteProduct = (groupId: string, productId: string) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? { ...group, products: group.products.filter(p => p.id !== productId) }
        : group
    ))
  }

  const duplicateProduct = (groupId: string, productId: string) => {
    const group = groups.find(g => g.id === groupId)
    const product = group?.products.find(p => p.id === productId)
    if (product) {
      const duplicatedProduct = {
        ...product,
        id: Date.now().toString(),
        name: `${product.name} (Copy)`
      }
      setGroups(groups.map(g =>
        g.id === groupId
          ? { ...g, products: [...g.products, duplicatedProduct] }
          : g
      ))
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button onClick={addGroup} className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          Add Group
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="text-green-600 border-green-200">
            <Import className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-200">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Groups */}
      {groups.map((group) => (
        <div key={group.id} className="border rounded-lg p-4 space-y-4">
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
                onClick={() => deleteGroup(group.id)}
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
                    onChange={(e) => updateProduct(group.id, product.id, { name: e.target.value })}
                    className="h-8"
                  />
                </div>

                {/* Length/Diameter */}
                <div className="relative">
                  <Input
                    type="number"
                    value={product.length}
                    onChange={(e) => updateProduct(group.id, product.id, { length: parseInt(e.target.value) })}
                    className="h-8 pr-8"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
                </div>

                {/* Width */}
                <div className="relative">
                  <Input
                    type="number"
                    value={product.width}
                    onChange={(e) => updateProduct(group.id, product.id, { width: parseInt(e.target.value) })}
                    className="h-8 pr-8"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
                </div>

                {/* Height */}
                <div className="relative">
                  <Input
                    type="number"
                    value={product.height}
                    onChange={(e) => updateProduct(group.id, product.id, { height: parseInt(e.target.value) })}
                    className="h-8 pr-8"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">mm</span>
                </div>

                {/* Weight */}
                <div className="relative">
                  <Input
                    type="number"
                    value={product.weight}
                    onChange={(e) => updateProduct(group.id, product.id, { weight: parseInt(e.target.value) })}
                    className="h-8 pr-6"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
                </div>

                {/* Quantity */}
                <div>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(group.id, product.id, { quantity: parseInt(e.target.value) })}
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
                          onClick={() => updateProduct(group.id, product.id, { color: color.value })}
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
                    onClick={() => updateProduct(group.id, product.id, { canStack: !product.canStack })}
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
                      <DropdownMenuItem onClick={() => duplicateProduct(group.id, product.id)}>
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteProduct(group.id, product.id)}
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
            onClick={() => addProduct(group.id)}
            className="text-blue-500 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4" />
            Add product
          </Button>

          {/* Use Pallets */}
          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              checked={usePallets}
              onChange={(checked) => setUsePallets(checked)}
            />
            <label className="text-sm">Use pallets</label>
            <span className="text-gray-400">?</span>
          </div>
        </div>
      ))}

      {/* Next Button */}
      <div className="flex justify-center pt-4">
        <Button className="bg-blue-500 hover:bg-blue-600 px-12">
          Next
        </Button>
      </div>
    </div>
  )
}
