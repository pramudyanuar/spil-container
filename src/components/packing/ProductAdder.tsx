import { useState } from 'react'
import { usePackingOperations } from '@/hooks/usePackingOperations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Product, ProductType } from '@/types/product'

const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'box', label: 'Kotak' },
  { value: 'big-bag', label: 'Karung Besar' },
  { value: 'sack', label: 'Karung' },
  { value: 'barrel', label: 'Tong' },
  { value: 'roll', label: 'Gulungan' },
]

const PRODUCT_COLORS = [
  '#4f46e5', '#dc2626', '#059669', '#d97706', '#7c3aed',
  '#0891b2', '#be185d', '#15803d', '#c2410c', '#6366f1'
]

export function ProductAdder() {
  const { selectedContainer, addProduct, isCalculating } = usePackingOperations()
  const [product, setProduct] = useState<Partial<Product>>({
    type: 'box',
    name: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    quantity: 1,
    color: PRODUCT_COLORS[0],
    canStack: true,
  })
  const [groupName, setGroupName] = useState('')
  const [result, setResult] = useState<{ canFit: boolean; message: string } | null>(null)

  const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
    setProduct(prev => ({ ...prev, [field]: value }))
    setResult(null) // Clear previous result when input changes
  }

  const handleAddProduct = async () => {
    if (!selectedContainer) {
      setResult({ canFit: false, message: 'Silakan pilih kontainer terlebih dahulu' })
      return
    }

    // Validate required fields
    if (!product.name || !product.length || !product.width || !product.height || !groupName.trim()) {
      setResult({ canFit: false, message: 'Silakan lengkapi semua kolom yang diperlukan' })
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      type: product.type || 'box',
      name: product.name,
      length: Number(product.length) * 10, // Convert cm to mm
      width: Number(product.width) * 10, // Convert cm to mm
      height: Number(product.height) * 10, // Convert cm to mm
      weight: Number(product.weight || 0),
      quantity: Number(product.quantity || 1),
      color: product.color || PRODUCT_COLORS[0],
      canStack: product.canStack ?? true,
    }

    try {
      const packingResult = await addProduct(newProduct)
      
      if (packingResult.canFit) {
        setResult({ 
          canFit: true, 
          message: `✓ Produk "${newProduct.name}" dari grup "${groupName}" berhasil ditambahkan!` 
        })
        // Reset form
        setProduct({
          type: 'box',
          name: '',
          length: 0,
          width: 0,
          height: 0,
          weight: 0,
          quantity: 1,
          color: PRODUCT_COLORS[Math.floor(Math.random() * PRODUCT_COLORS.length)],
          canStack: true,
        })
        setGroupName('')
      } else {
        setResult({ 
          canFit: false, 
          message: `✗ Produk "${newProduct.name}" tidak dapat masuk ke dalam kontainer` 
        })
      }
    } catch (error) {
      setResult({ 
        canFit: false, 
        message: `Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}` 
      })
    }
  }

  if (!selectedContainer) {
    return (
      <div className="text-center p-8 text-gray-300 bg-gray-800 rounded-lg">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-lg font-medium">Kontainer Belum Dipilih</p>
        <p className="text-gray-400 mt-1">Silakan kembali ke Langkah 1 untuk memilih kontainer terlebih dahulu.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
        <h3 className="text-lg font-medium text-gray-100 mb-4">
          Detail Produk
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nama Grup *
            </label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Masukkan nama grup produk"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Jenis Produk
            </label>
            <select
              value={product.type || 'box'}
              onChange={(e) => handleInputChange('type', e.target.value as ProductType)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 focus:border-[#3A9542] focus:outline-none focus:ring-1 focus:ring-[#3A9542]"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nama Produk *
            </label>
            <Input
              value={product.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama produk"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Panjang (cm) *
            </label>
            <Input
              type="number"
              value={product.length || ''}
              onChange={(e) => handleInputChange('length', Number(e.target.value))}
              placeholder="Panjang dalam cm"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Lebar (cm) *
            </label>
            <Input
              type="number"
              value={product.width || ''}
              onChange={(e) => handleInputChange('width', Number(e.target.value))}
              placeholder="Lebar dalam cm"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tinggi (cm) *
            </label>
            <Input
              type="number"
              value={product.height || ''}
              onChange={(e) => handleInputChange('height', Number(e.target.value))}
              placeholder="Tinggi dalam cm"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Berat (kg)
            </label>
            <Input
              type="number"
              value={product.weight || ''}
              onChange={(e) => handleInputChange('weight', Number(e.target.value))}
              placeholder="Berat dalam kg"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Warna
            </label>
            <div className="flex gap-2">
              {PRODUCT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    product.color === color ? 'border-gray-100' : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleInputChange('color', color)}
                />
              ))}
            </div>
          </div>

          {/* Can Stack */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.canStack ?? true}
                onChange={(e) => handleInputChange('canStack', e.target.checked)}
                className="rounded border-gray-300 text-[#3A9542] focus:ring-[#3A9542]"
              />
              <span className="text-sm font-medium text-gray-300">
                Dapat ditumpuk
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleAddProduct}
            disabled={isCalculating}
            className="w-full bg-[#3A9542] hover:bg-[#2d7233]"
          >
            {isCalculating ? 'Menghitung...' : 'Tambahkan Produk ke Kontainer'}
          </Button>
        </div>

        {result && (
          <div className={`mt-4 p-3 rounded-md ${
            result.canFit 
              ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
          }`}>
            <p className="text-sm font-medium">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
