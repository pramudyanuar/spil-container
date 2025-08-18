import { useEffect } from 'react'
import { useContainerOperations } from '@/hooks/useContainerOperations'
import type { Container } from '@/types/container'

export function ContainersTrucksPage() {
  const { 
    containers, 
    trucks, 
    isLoading, 
    loadContainers, 
    loadTrucks 
  } = useContainerOperations()

  useEffect(() => {
    loadContainers()
    loadTrucks()
  }, [loadContainers, loadTrucks])

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

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
      case 'limited':
        return <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Limited</span>
      case 'unavailable':
        return <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Unavailable</span>
      default:
        return null
    }
  }

  const getDimensionsText = (container: Container) => {
    const { length, width, height } = container.dimensions
    return `${length/1000}m x ${width/1000}m x ${height/1000}m`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Containers & Trucks</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground text-center mb-6">
          Choose your containers and trucks for transportation
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Containers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Containers</h3>
            <div className="space-y-3">
              {containers.map((container) => (
                <div key={container.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{container.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Dimensions: {getDimensionsText(container)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Max Weight: {container.maxWeight}kg | Cost: ${container.cost}
                      </p>
                    </div>
                    {getAvailabilityBadge(container.availability)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trucks Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Trucks</h3>
            <div className="space-y-3">
              {trucks.map((truck) => (
                <div key={truck.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{truck.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {truck.containerCapacity.join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cost: ${truck.cost}/day
                      </p>
                    </div>
                    {getAvailabilityBadge(truck.availability)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
