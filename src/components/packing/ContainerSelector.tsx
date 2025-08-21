import { useState, useEffect } from 'react'
import { usePackingOperations } from '@/hooks/usePackingOperations'
import type { Container } from '@/types/container'

const COMMON_CONTAINERS: Container[] = [
  {
    id: 'standard-20ft',
    type: 'standard-20ft',
    name: '20ft Standard Container',
    dimensions: {
      length: 5900, // mm
      width: 2350,
      height: 2390
    },
    maxWeight: 28200, // kg
    availability: 'available',
    cost: 150
  },
  {
    id: 'standard-40ft',
    type: 'standard-40ft',
    name: '40ft Standard Container',
    dimensions: {
      length: 12030,
      width: 2350,
      height: 2390
    },
    maxWeight: 28600,
    availability: 'available',
    cost: 200
  },
  {
    id: 'high-cube-40ft',
    type: 'high-cube-40ft',
    name: '40ft High Cube Container',
    dimensions: {
      length: 12030,
      width: 2350,
      height: 2690
    },
    maxWeight: 28600,
    availability: 'available',
    cost: 220
  },
  {
    id: 'high-cube-45ft',
    type: 'high-cube-45ft',
    name: '45ft High Cube Container',
    dimensions: {
      length: 13580,
      width: 2350,
      height: 2690
    },
    maxWeight: 29000,
    availability: 'available',
    cost: 250
  }
]

export function ContainerSelector() {
  const { selectedContainer, selectContainer } = usePackingOperations()
  const [containers, setContainers] = useState<Container[]>([])

  useEffect(() => {
    // In real app, this would fetch from API
    setContainers(COMMON_CONTAINERS)
  }, [])

  const formatDimensions = (dims: { length: number; width: number; height: number }) => {
    return `${(dims.length / 1000).toFixed(1)}m × ${(dims.width / 1000).toFixed(1)}m × ${(dims.height / 1000).toFixed(1)}m`
  }

  const calculateVolume = (dims: { length: number; width: number; height: number }) => {
    return Math.round((dims.length * dims.width * dims.height) / 1000000000) // Convert to m³
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Langkah 1: Pilih Ukuran Kontainer
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {containers.map((container) => (
          <div
            key={container.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all bg-white dark:bg-gray-800 ${
              selectedContainer?.id === container.id
                ? 'border-[#3A9542] bg-green-50 dark:bg-green-950/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => selectContainer(container)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {container.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDimensions(container.dimensions)}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Volume: {calculateVolume(container.dimensions)} m³
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Berat Maks: {(container.maxWeight / 1000).toFixed(1)} ton
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ${container.cost}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  per kontainer
                </div>
              </div>
            </div>
            
            {selectedContainer?.id === container.id && (
              <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-[#3A9542] dark:text-green-400">
                  <div className="w-2 h-2 bg-[#3A9542] dark:bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Terpilih</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedContainer && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <div className="w-5 h-5 bg-[#3A9542] rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Kontainer Dipilih: {selectedContainer.name}</p>
              <p className="text-sm">Siap untuk menambahkan produk ke kontainer Anda</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
