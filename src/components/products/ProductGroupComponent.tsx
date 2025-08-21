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
  Check,
  X,
} from 'lucide-react'
import type { Product, ProductGroup, ProductType } from '@/types/product'
import { productTypeIcons, colorOptions } from '@/constants/app'
import { ProductTypeSelector } from './ProductTypeSelector'
import { useCallback, useState } from 'react'

interface ProductGroupComponentProps {
  group: ProductGroup
  onDeleteGroup: (groupId: string) => void
  onUpdateGroup: (groupId: string, updates: Partial<ProductGroup>) => void
  onAddProduct: (groupId: string, type: ProductType) => void
  onUpdateProduct: (groupId: string, productId: string, updates: Partial<Product>) => void
  onDeleteProduct: (groupId: string, productId: string) => void
  onDuplicateProduct: (groupId: string, productId: string) => void
}

interface DimensionInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  isWeight?: boolean // To differentiate weight from dimensions
}

interface ColorSelectorProps {
  currentColor: string
  onColorChange: (color: string) => void
}

interface StackToggleProps {
  canStack: boolean
  onToggle: () => void
}

interface ProductRowProps {
  product: Product
  groupId: string
  onUpdateProduct: (groupId: string, productId: string, updates: Partial<Product>) => void
  onDeleteProduct: (groupId: string, productId: string) => void
  onDuplicateProduct: (groupId: string, productId: string) => void
}

// Helper component for dimension inputs
function DimensionInput({ value, onChange, placeholder, isWeight = false }: DimensionInputProps) {
  const displayValue = isWeight ? value : Math.round(value / 10) // Convert mm to cm for display, except for weight
  const handleChange = (inputValue: number) => {
    const actualValue = isWeight ? inputValue : inputValue * 10 // Convert cm to mm for storage, except for weight
    onChange(actualValue)
  }
  
  return (
    <div className="flex items-center justify-center">
      <Input
        type="number"
        value={displayValue || ''}
        onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
        placeholder={placeholder}
        className="h-9 w-[75px] px-2 text-center text-sm border-gray-300 bg-gray-700 text-white"
      />
    </div>
  )
}

// Helper component for color selection
function ColorSelector({ currentColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {colorOptions.map((color) => (
            <DropdownMenuItem
              key={color.value}
              onClick={() => onColorChange(color.value)}
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
  )
}

// Helper component for stack toggle
function StackToggle({ canStack, onToggle }: StackToggleProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
          canStack 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {canStack && <span className="text-xs">✓</span>}
      </button>
    </div>
  )
}

// Individual product row component
function ProductRow({ product, groupId, onUpdateProduct, onDeleteProduct, onDuplicateProduct }: ProductRowProps) {
  const IconComponent = productTypeIcons[product.type]
  
  const updateProduct = useCallback((updates: Partial<Product>) => {
    onUpdateProduct(groupId, product.id, updates)
  }, [groupId, product.id, onUpdateProduct])

  return (
    <div className="grid grid-cols-13 gap-x-4 gap-y-2 items-center py-4">
      {/* Type */}
      <div className="flex justify-center items-center">
        <IconComponent className="w-5 h-5 text-gray-600" />
      </div>

      {/* Product Name */}
      <div className="col-span-3 flex items-center justify-center">
        <Input
          value={product.name}
          onChange={(e) => updateProduct({ name: e.target.value })}
          className="h-9 w-full text-center border-gray-300 bg-gray-700 text-white"
          placeholder="Nama produk"
        />
      </div>

      {/* Dimensions */}
      <DimensionInput
        value={product.length}
        onChange={(length) => updateProduct({ length })}
        placeholder="Panjang"
      />

      <DimensionInput
        value={product.width}
        onChange={(width) => updateProduct({ width })}
        placeholder="Lebar"
      />

      <DimensionInput
        value={product.height}
        onChange={(height) => updateProduct({ height })}
        placeholder="Tinggi"
      />

      <DimensionInput
        value={product.weight}
        onChange={(weight) => updateProduct({ weight })}
        placeholder="Berat"
        isWeight={true}
      />

      {/* Quantity */}
      <div className="flex items-center justify-center">
        <Input
          type="number"
          value={product.quantity || ''}
          onChange={(e) => updateProduct({ quantity: parseInt(e.target.value) || 0 })}
          className="h-9 w-[75px] px-2 text-center text-sm border-gray-300 bg-gray-700 text-white"
          placeholder="Jml"
        />
      </div>

      {/* Color */}
      <ColorSelector
        currentColor={product.color}
        onColorChange={(color) => updateProduct({ color })}
      />

      {/* Stack */}
      <StackToggle
        canStack={product.canStack}
        onToggle={() => updateProduct({ canStack: !product.canStack })}
      />

      {/* Actions */}
      <div className="flex justify-center gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#3A9542] hover:bg-green-50"
          onClick={() => onDuplicateProduct(groupId, product.id)}
          title="Duplikat"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:bg-red-50"
          onClick={() => onDeleteProduct(groupId, product.id)}
          title="Hapus"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// Table header component
function TableHeader() {
  return (
    <div className="grid grid-cols-13 gap-x-4 gap-y-2 text-sm text-gray-300 border-b pb-3 font-medium items-center bg-gray-800">
      <div className="text-center">Jenis</div>
      <div className="col-span-3 text-center">Nama Produk</div>
      <div className="text-center">Panjang /<br/>Diameter<br/><span className="text-xs">(cm)</span></div>
      <div className="text-center">Lebar<br/><span className="text-xs">(cm)</span></div>
      <div className="text-center">Tinggi<br/><span className="text-xs">(cm)</span></div>
      <div className="text-center">Berat<br/><span className="text-xs">(kg)</span></div>
      <div className="text-center">Jumlah</div>
      <div className="text-center">Warna</div>
      <div className="text-center">Stack</div>
      <div className="text-center">Aksi</div>
    </div>
  )
}

// Group header component
function GroupHeader({ 
  group, 
  onDeleteGroup,
  onUpdateGroup 
}: { 
  group: ProductGroup; 
  onDeleteGroup: (groupId: string) => void;
  onUpdateGroup: (groupId: string, updates: Partial<ProductGroup>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(group.name)

  const handleSave = () => {
    if (editName.trim() && editName !== group.name) {
      onUpdateGroup(group.id, { name: editName.trim() })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(group.name)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center justify-between pb-2 border-b">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-black rounded-full" />
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-8 text-lg font-semibold border-gray-300"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="h-6 w-6 text-green-600 hover:bg-green-50"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-6 w-6 text-red-600 hover:bg-red-50"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <span className="font-semibold text-lg">{group.name}</span>
            <Edit3 
              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
              onClick={() => setIsEditing(true)}
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDeleteGroup(group.id)}
          className="text-red-500 hover:bg-red-50"
          title="Delete group"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          title="Duplicate group"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          title="Group settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// Main component
export function ProductGroupComponent({ 
  group, 
  onDeleteGroup,
  onUpdateGroup,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onDuplicateProduct
}: ProductGroupComponentProps) {
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [selectedType, setSelectedType] = useState<ProductType | undefined>(undefined)

  const handleAddProduct = () => {
    setShowTypeSelector(true)
  }

  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type)
    onAddProduct(group.id, type)
    setShowTypeSelector(false)
    setSelectedType(undefined)
  }

  const handleCancel = () => {
    setShowTypeSelector(false)
    setSelectedType(undefined)
  }

  return (
    <>
      <div className="border rounded-xl p-6 space-y-6 shadow-sm bg-gray-800 dark:bg-gray-800">
        <GroupHeader 
          group={group} 
          onDeleteGroup={onDeleteGroup} 
          onUpdateGroup={onUpdateGroup}
        />
        
        <TableHeader />

        <div className="divide-y">
          {group.products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              groupId={group.id}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              onDuplicateProduct={onDuplicateProduct}
            />
          ))}
        </div>

        <div className="pt-2 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handleAddProduct}
            className="text-[#3A9542] hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tambah produk
          </Button>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`use-pallets-${group.id}`}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label 
              htmlFor={`use-pallets-${group.id}`}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Use pallets
            </label>
          </div>
        </div>
      </div>

      {showTypeSelector && (
        <ProductTypeSelector
          selectedType={selectedType}
          onSelect={handleTypeSelect}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}
