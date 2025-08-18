import type { Container, Truck, StuffingResult } from '@/types/container'
import type { ProductGroup } from '@/types/product'

// Mock data for containers
const mockContainers: Container[] = [
  {
    id: '1',
    type: 'standard-20ft',
    name: '20ft Standard Container',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'available',
    cost: 120
  },
  {
    id: '2', 
    type: 'standard-40ft',
    name: '40ft Standard Container',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'available',
    cost: 200
  },
  {
    id: '3',
    type: 'high-cube-40ft',
    name: '40ft High Cube Container', 
    dimensions: { length: 12032, width: 2438, height: 2896 },
    maxWeight: 26700,
    availability: 'limited',
    cost: 220
  }
]

// Mock data for trucks
const mockTrucks: Truck[] = [
  {
    id: '1',
    type: 'standard',
    name: 'Standard Truck',
    containerCapacity: ['standard-20ft'],
    availability: 'available',
    cost: 150
  },
  {
    id: '2',
    type: 'heavy-duty', 
    name: 'Heavy Duty Truck',
    containerCapacity: ['standard-40ft', 'high-cube-40ft'],
    availability: 'available',
    cost: 200
  },
  {
    id: '3',
    type: 'specialized',
    name: 'Specialized Truck',
    containerCapacity: ['standard-20ft', 'standard-40ft', 'high-cube-40ft'],
    availability: 'unavailable',
    cost: 300
  }
]

class ContainerService {
  private containers: Container[] = [...mockContainers]
  private trucks: Truck[] = [...mockTrucks]

  async getContainers(): Promise<Container[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.containers]), 100)
    })
  }

  async getTrucks(): Promise<Truck[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.trucks]), 100)
    })
  }

  async getContainerById(id: string): Promise<Container | null> {
    return this.containers.find(c => c.id === id) || null
  }

  async getTruckById(id: string): Promise<Truck | null> {
    return this.trucks.find(t => t.id === id) || null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async calculateOptimization(_groupsData: ProductGroup[]): Promise<StuffingResult> {
    // Mock optimization calculation
    // In real app, this would call optimization algorithm API
    return new Promise((resolve) => {
      setTimeout(() => {
        const result: StuffingResult = {
          totalContainers: 3,
          averageUtilization: 85,
          totalCost: 2450,
          containerAssignments: [
            {
              containerId: '3',
              utilization: 92,
              assignedProducts: [
                { productId: '1', groupId: '1', quantity: 15 },
                { productId: '2', groupId: '1', quantity: 8 }
              ]
            },
            {
              containerId: '2',
              utilization: 78,
              assignedProducts: [
                { productId: '3', groupId: '1', quantity: 5 }
              ]
            },
            {
              containerId: '1',
              utilization: 85,
              assignedProducts: [
                { productId: '1', groupId: '1', quantity: 10 }
              ]
            }
          ]
        }
        resolve(result)
      }, 1000)
    })
  }
}

export const containerService = new ContainerService()
