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

export function ProductFitChecker() {
  const { selectedContainer, currentSession, checkProductFit, isCalculating } = usePackingOperations()
  const [testProduct, setTestProduct] = useState<Partial<Product>>({
    type: 'box',
    name: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  })
  const [checkResult, setCheckResult] = useState<{
    canFit: boolean
    message: string
    position?: { x: number; y: number; z: number }
  } | null>(null)

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setTestProduct(prev => ({ ...prev, [field]: value }))
    setCheckResult(null) // Clear previous result when input changes
  }

  const handleCheckFit = async () => {
    if (!selectedContainer) {
      setCheckResult({ canFit: false, message: 'Silakan pilih kontainer terlebih dahulu' })
      return
    }

    if (!currentSession || currentSession.packedProducts.length === 0) {
      setCheckResult({ canFit: false, message: 'Tambahkan beberapa produk terlebih dahulu pada Langkah 2' })
      return
    }

    // Validate required fields
    if (!testProduct.name || !testProduct.length || !testProduct.width || !testProduct.height) {
      setCheckResult({ canFit: false, message: 'Silakan lengkapi semua kolom yang diperlukan' })
      return
    }

    const productToCheck: Product = {
      id: 'test-product',
      type: testProduct.type || 'box',
      name: testProduct.name,
      length: Number(testProduct.length) * 10, // Convert cm to mm
      width: Number(testProduct.width) * 10, // Convert cm to mm
      height: Number(testProduct.height) * 10, // Convert cm to mm
      weight: Number(testProduct.weight || 0),
      quantity: 1,
      color: '#6b7280',
      canStack: true,
    }

    try {
      const result = await checkProductFit(productToCheck)
      
      if (result.canFit && result.position) {
        setCheckResult({
          canFit: true,
          message: `✓ Produk "${productToCheck.name}" dapat masuk ke dalam kontainer!`,
          position: result.position
        })
      } else {
        setCheckResult({
          canFit: false,
          message: `✗ Produk "${productToCheck.name}" tidak dapat masuk ke ruang yang tersisa`
        })
      }
    } catch (error) {
      setCheckResult({
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-medium">Kontainer Belum Dipilih</p>
        <p className="text-gray-400 mt-1">Silakan kembali ke Langkah 1 untuk memilih kontainer terlebih dahulu.</p>
      </div>
    )
  }

  const formatVolume = (volume: number) => {
    return (volume / 1000000000).toFixed(2) // Convert mm³ to m³
  }

  return (
    <div className="space-y-6">
      {/* Container Status Summary */}
      {currentSession && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <h3 className="font-medium text-green-100 mb-2">Status Kontainer Saat Ini</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-green-300 font-medium">Produk:</span>
              <span className="ml-2 text-white">{currentSession.packedProducts.length}</span>
            </div>
            <div>
              <span className="text-green-300 font-medium">Utilisasi:</span>
              <span className="ml-2 text-white">{currentSession.utilizationPercentage}%</span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300 font-medium">Terpakai:</span>
              <span className="ml-2">{formatVolume(currentSession.usedVolume)} m³</span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300 font-medium">Tersisa:</span>
              <span className="ml-2">{formatVolume(currentSession.remainingVolume)} m³</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Uji Dimensi Produk
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jenis Produk
            </label>
            <select
              value={testProduct.type || 'box'}
              onChange={(e) => handleInputChange('type', e.target.value as ProductType)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-[#3A9542] focus:outline-none focus:ring-1 focus:ring-[#3A9542]"
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
              value={testProduct.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama produk untuk dicek"
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
              value={testProduct.length || ''}
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
              value={testProduct.width || ''}
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
              value={testProduct.height || ''}
              onChange={(e) => handleInputChange('height', Number(e.target.value))}
              placeholder="Tinggi dalam cm"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Berat (kg)
            </label>
            <Input
              type="number"
              value={testProduct.weight || ''}
              onChange={(e) => handleInputChange('weight', Number(e.target.value))}
              placeholder="Berat dalam kg (opsional)"
              className="bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleCheckFit}
            disabled={isCalculating}
            className="w-full bg-[#3A9542] hover:bg-[#2d7233]"
            variant="default"
          >
            {isCalculating ? 'Mengecek Kesesuaian...' : 'Cek Apakah Produk Dapat Masuk'}
          </Button>
        </div>

        {checkResult && (
          <div className={`mt-4 p-4 rounded-lg border ${
            checkResult.canFit 
              ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                checkResult.canFit ? 'bg-green-600' : 'bg-red-600'
              }`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {checkResult.canFit ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">{checkResult.message}</p>
                {checkResult.canFit && checkResult.position && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Posisi Optimal:</p>
                    <p>X: {checkResult.position.x}mm, Y: {checkResult.position.y}mm, Z: {checkResult.position.z}mm</p>
                    <p className="mt-1 text-xs opacity-75">
                      Produk dapat ditempatkan pada posisi ini dalam kontainer
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
