import { useEffect, useState } from 'react'
import { useContainerOperations } from '@/hooks/useContainerOperations'
import { useGroups } from '@/hooks/useAppState'
import { Container3D } from '@/components/visualization/Container3D'
import { ProductLegend } from '@/components/visualization/ProductLegend'
import type { Container } from '@/types/container'
import type { Product, ProductType } from '@/types/product'

interface ContainerResultProps {
  container: Container
  utilization: number
  assignedProducts: Array<{
    productId: string
    groupId: string
    quantity: number
  }>
}

function ContainerResult({ container, utilization, assignedProducts }: ContainerResultProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-800">
      <div className="bg-muted/50 px-4 py-3 border-b">
        <h4 className="font-medium text-white">{container.name}</h4>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-2 text-white">Produk Terisi:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              {assignedProducts.map((assignment, index) => (
                <li key={index}>• Produk {assignment.productId} ({assignment.quantity} unit)</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-white">Penggunaan:</p>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-[#3A9542] h-2 rounded-full" 
                style={{ width: `${utilization}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-1">{utilization}% terisi</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StuffingResultPage() {
  const groups = useGroups()
  const { stuffingResult, calculateOptimization, getContainerById } = useContainerOperations()

  // Get all products from groups
  const allProducts = groups.flatMap(group => group.products)

  useEffect(() => {
    if (groups.length > 0 && !stuffingResult) {
      calculateOptimization(groups)
    }
  }, [groups, stuffingResult, calculateOptimization])

  if (!stuffingResult) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A9542] mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Menghitung optimasi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      <h2 className="text-2xl font-bold text-center text-white">Hasil Stuffing</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-300 text-center mb-6">
          Tinjau hasil optimasi stuffing Anda
        </p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#3A9542]/20 dark:bg-[#3A9542]/20 border border-[#3A9542] dark:border-[#3A9542] rounded-lg p-4">
            <h3 className="font-semibold text-green-200 dark:text-green-100">Total Container</h3>
            <p className="text-2xl font-bold text-[#3A9542] dark:text-green-400">
              {stuffingResult.totalContainers}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100">Penggunaan Ruang</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stuffingResult.averageUtilization}%
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Total Biaya</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${stuffingResult.totalCost}
            </p>
          </div>
        </div>

        {/* Container Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Detail Penempatan Container</h3>
          
          {stuffingResult.containerAssignments.map((assignment, index) => (
            <ContainerAssignment 
              key={index}
              assignment={assignment}
              getContainerById={getContainerById}
              allProducts={allProducts}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ContainerAssignmentProps {
  assignment: {
    containerId: string
    utilization: number
    assignedProducts: Array<{
      productId: string
      groupId: string
      quantity: number
    }>
  }
  getContainerById: (id: string) => Promise<Container | null>
  allProducts: Product[]
}

function ContainerAssignment({ assignment, getContainerById, allProducts }: ContainerAssignmentProps) {
  const [container, setContainer] = useState<Container | null>(null)

  useEffect(() => {
    getContainerById(assignment.containerId).then(setContainer)
  }, [assignment.containerId, getContainerById])

  if (!container) return null

  // Get unique product types for this container's legend
  const assignedProductIds = assignment.assignedProducts.map(ap => ap.productId)
  const assignedProductsData = allProducts.filter(p => assignedProductIds.includes(p.id))
  const containerProductTypes: ProductType[] = [...new Set(assignedProductsData.map(p => p.type))]

  return (
    <div className="space-y-4">
      <ContainerResult 
        container={container} 
        utilization={assignment.utilization}
        assignedProducts={assignment.assignedProducts}
      />
      
      {/* 3D Visualization */}
      <div className="bg-gray-900 dark:bg-gray-900 rounded-lg p-6 border border-gray-600 dark:border-gray-700">
        <h4 className="font-medium text-gray-100 dark:text-gray-100 mb-4">Visualisasi 3D Packing</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Container3D
              container={container}
              assignment={assignment}
              products={allProducts}
            />
          </div>
          <div className="lg:col-span-1">
            <ProductLegend productTypes={containerProductTypes} />
          </div>
        </div>
      </div>
    </div>
  )
}
