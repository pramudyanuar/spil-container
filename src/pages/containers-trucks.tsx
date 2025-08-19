import { useEffect, useState } from 'react'
import { useContainerOperations } from '@/hooks/useContainerOperations'
import type { Container, Truck } from '@/types/container'

export function ContainersTrucksPage() {
  const { 
    containers, 
    trucks, 
    isLoading, 
    loadContainers, 
    loadTrucks 
  } = useContainerOperations()
  
  const [selectedContainer, setSelectedContainer] = useState<string>('')
  const [selectedTruck, setSelectedTruck] = useState<string>('')

  useEffect(() => {
    loadContainers()
    loadTrucks()
  }, [loadContainers, loadTrucks])

  // Set default selections
  useEffect(() => {
    if (containers.length > 0 && !selectedContainer) {
      setSelectedContainer('1') // 20' STANDARD
    }
    if (trucks.length > 0 && !selectedTruck) {
      setSelectedTruck('1') // TAUTLINER
    }
  }, [containers, trucks, selectedContainer, selectedTruck])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading containers and trucks...</p>
        </div>
      </div>
    )
  }

  const getContainerImage = () => {
    // Return placeholder for container image
    return '/src/assets/images/package.png'
  }

  const getTruckImage = () => {
    // Return placeholder for truck image  
    return '/src/assets/images/package.png'
  }

  const ContainerCard = ({ container }: { container: Container }) => (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        selectedContainer === container.id 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
      }`}
      onClick={() => setSelectedContainer(container.id)}
    >
      <div className="text-center">
        <div className="mb-3 flex justify-center bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          <img 
            src={getContainerImage()} 
            alt={container.name}
            className="w-20 h-16 object-contain filter dark:invert"
          />
        </div>
        <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">{container.name}</h4>
        {container.availability !== 'unavailable' && (
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            LEARN MORE
          </button>
        )}
        {container.availability === 'unavailable' && (
          <p className="text-xs text-gray-500 dark:text-gray-400">COMING SOON</p>
        )}
      </div>
    </div>
  )

  const TruckCard = ({ truck }: { truck: Truck }) => (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        selectedTruck === truck.id 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
      }`}
      onClick={() => setSelectedTruck(truck.id)}
    >
      <div className="text-center">
        <div className="mb-3 flex justify-center bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          <img 
            src={getTruckImage()} 
            alt={truck.name}
            className="w-20 h-16 object-contain filter dark:invert"
          />
        </div>
        <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">{truck.name}</h4>
        {truck.availability !== 'unavailable' && (
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            LEARN MORE
          </button>
        )}
        {truck.availability === 'unavailable' && (
          <p className="text-xs text-gray-500 dark:text-gray-400">COMING SOON</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-black min-h-screen">
      {/* Trucks Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Select Truck Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {trucks.map((truck) => (
            <TruckCard key={truck.id} truck={truck} />
          ))}
        </div>
      </div>

      {/* Containers Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Select Container Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {containers.map((container) => (
            <ContainerCard key={container.id} container={container} />
          ))}
        </div>
      </div>

      {/* Selected Items Summary */}
      {(selectedContainer || selectedTruck) && (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Selected Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTruck && (
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Truck:</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {trucks.find(t => t.id === selectedTruck)?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cost: ${trucks.find(t => t.id === selectedTruck)?.cost}/day
                </p>
              </div>
            )}
            {selectedContainer && (
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Container:</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {containers.find(c => c.id === selectedContainer)?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cost: ${containers.find(c => c.id === selectedContainer)?.cost}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
