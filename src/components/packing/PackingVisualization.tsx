import { useState } from 'react'
import { usePackingOperations } from '@/hooks/usePackingOperations'
import { Container3D } from '@/components/visualization/Container3D'
import { ProductLegend } from '@/components/visualization/ProductLegend'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/types/product'

export function PackingVisualization() {
  const { selectedContainer, currentSession, removeProduct, clearSession } = usePackingOperations()
  const [viewMode, setViewMode] = useState<'3d' | 'list'>('3d')

  if (!selectedContainer || !currentSession) {
    return (
      <div className="text-center p-8 text-gray-300 bg-gray-800 rounded-lg">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <p className="text-lg font-medium">Belum Ada Produk</p>
        <p className="text-gray-400 mt-1">Tambahkan beberapa produk pada Langkah 2 untuk melihat visualisasi packing.</p>
      </div>
    )
  }

  const formatVolume = (volume: number) => {
    return (volume / 1000000000).toFixed(2) // Convert mm³ to m³
  }

  // Convert PackedProduct to Product for visualization
  // No longer needed as we pass packedProducts directly

  // Get unique product types for legend
  const productTypes: ProductType[] = [...new Set(currentSession.packedProducts.map(p => p.type))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('3d')}
            className={viewMode === '3d' ? 'bg-[#3A9542] hover:bg-[#2d7233]' : 'bg-gray-700 border-gray-600'}
          >
            Tampilan 3D
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#3A9542] hover:bg-[#2d7233]' : 'bg-gray-700 border-gray-600'}
          >
            Tampilan Daftar
          </Button>
        </div>
      </div>

      {/* Container Info & Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3A9542] dark:text-green-400">
              {selectedContainer.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {(selectedContainer.dimensions.length / 1000).toFixed(1)}m × {(selectedContainer.dimensions.width / 1000).toFixed(1)}m × {(selectedContainer.dimensions.height / 1000).toFixed(1)}m
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {currentSession.utilizationPercentage}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Utilisasi Ruang
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatVolume(currentSession.usedVolume)} m³
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Volume Terpakai
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatVolume(currentSession.remainingVolume)} m³
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Ruang Tersisa
            </div>
          </div>
        </div>

        {/* Utilization Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Utilisasi Kontainer</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{currentSession.utilizationPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#3A9542] to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(currentSession.utilizationPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* 3D Visualization */
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Preview Packing 3D
            </h3>
            {currentSession.packedProducts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearSession}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Bersihkan Semua
              </Button>
            )}
          </div>
          
          {currentSession.packedProducts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Container3D
                  container={selectedContainer}
                  packedProducts={currentSession.packedProducts}
                />
              </div>
              <div className="lg:col-span-1 space-y-4">
                <ProductLegend productTypes={productTypes} />
                
                {/* Quick Stats */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Statistik Cepat</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Produk:</span>
                      <span className="font-medium">{currentSession.packedProducts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Berat:</span>
                      <span className="font-medium">
                        {currentSession.packedProducts.reduce((sum, p) => sum + p.weight, 0).toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>Belum ada produk yang ditambahkan. Tambahkan produk untuk melihat visualisasi 3D.</p>
            </div>
          )}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Daftar Produk yang Dipacking
            </h3>
            {currentSession.packedProducts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearSession}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Bersihkan Semua
              </Button>
            )}
          </div>

          {currentSession.packedProducts.length > 0 ? (
            <div className="space-y-3">
              {currentSession.packedProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: product.color }}></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {index + 1}. {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(product.length/10)}×{Math.round(product.width/10)}×{Math.round(product.height/10)}cm • {product.weight}kg • {product.type}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Posisi: ({Math.round(product.position.x/10)}, {Math.round(product.position.y/10)}, {Math.round(product.position.z/10)})cm
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Belum ada produk yang ditambahkan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
