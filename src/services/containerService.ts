import type { Container, Truck, StuffingResult } from '@/types/container'
import type { ProductGroup } from '@/types/product'

// Mock data for containers
const mockContainers: Container[] = [
  {
    id: '1',
    type: 'standard-20ft',
    name: '20\' STANDARD',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'available',
    cost: 120
  },
  {
    id: '2', 
    type: 'standard-40ft',
    name: '40\' STANDARD',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'available',
    cost: 200
  },
  {
    id: '3',
    type: 'high-cube-40ft',
    name: '40\' HIGH-CUBE', 
    dimensions: { length: 12032, width: 2438, height: 2896 },
    maxWeight: 26700,
    availability: 'available',
    cost: 220
  },
  {
    id: '4',
    type: 'high-cube-45ft',
    name: '45\' HIGH-CUBE',
    dimensions: { length: 13716, width: 2438, height: 2896 },
    maxWeight: 29600,
    availability: 'available',
    cost: 250
  },
  {
    id: '5',
    type: 'open-top-20ft',
    name: '20\' OPEN TOP',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'available',
    cost: 140
  },
  {
    id: '6',
    type: 'open-top-40ft',
    name: '40\' OPEN TOP',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'available',
    cost: 230
  },
  {
    id: '7',
    type: 'flatrack-20ft',
    name: '20\' FLATRACK',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'limited',
    cost: 160
  },
  {
    id: '8',
    type: 'flatrack-40ft',
    name: '40\' FLATRACK',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'limited',
    cost: 280
  },
  {
    id: '9',
    type: 'flatrack-collapsible-20ft',
    name: '20\' FLATRACK COLLAPSIBLE',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'limited',
    cost: 170
  },
  {
    id: '10',
    type: 'flatrack-collapsible-40ft',
    name: '40\' FLATRACK COLLAPSIBLE',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'limited',
    cost: 290
  },
  {
    id: '11',
    type: 'platform-20ft',
    name: '20\' PLATFORM',
    dimensions: { length: 6058, width: 2438, height: 300 },
    maxWeight: 28230,
    availability: 'limited',
    cost: 150
  },
  {
    id: '12',
    type: 'platform-40ft',
    name: '40\' PLATFORM',
    dimensions: { length: 12032, width: 2438, height: 300 },
    maxWeight: 26700,
    availability: 'limited',
    cost: 270
  },
  {
    id: '13',
    type: 'refrigerated-20ft',
    name: '20\' REFRIGERATED',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'available',
    cost: 200
  },
  {
    id: '14',
    type: 'refrigerated-40ft',
    name: '40\' REFRIGERATED',
    dimensions: { length: 12032, width: 2438, height: 2591 },
    maxWeight: 26700,
    availability: 'available',
    cost: 350
  },
  {
    id: '15',
    type: 'bulk-20ft',
    name: '20\' BULK',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'limited',
    cost: 180
  },
  {
    id: '16',
    type: 'tank-20ft',
    name: '20\' TANK',
    dimensions: { length: 6058, width: 2438, height: 2591 },
    maxWeight: 28230,
    availability: 'limited',
    cost: 220
  },
  {
    id: '17',
    type: 'custom',
    name: 'CUSTOM CONTAINER',
    dimensions: { length: 0, width: 0, height: 0 },
    maxWeight: 0,
    availability: 'available',
    cost: 0
  }
]

// Mock data for trucks
const mockTrucks: Truck[] = [
  {
    id: '1',
    type: 'tautliner',
    name: 'TAUTLINER (CUBAINSIDER)',
    containerCapacity: ['standard-20ft', 'standard-40ft', 'high-cube-40ft'],
    availability: 'available',
    cost: 150
  },
  {
    id: '2',
    type: 'refrigerated', 
    name: 'REFRIGERATED TRUCK',
    containerCapacity: ['refrigerated-20ft', 'refrigerated-40ft'],
    availability: 'available',
    cost: 200
  },
  {
    id: '3',
    type: 'isotherm',
    name: 'ISOTHERM TRUCK',
    containerCapacity: ['refrigerated-20ft', 'refrigerated-40ft'],
    availability: 'available',
    cost: 180
  },
  {
    id: '4',
    type: 'mega-trailer',
    name: 'MEGA-TRAILER',
    containerCapacity: ['high-cube-40ft', 'high-cube-45ft'],
    availability: 'available',
    cost: 250
  },
  {
    id: '5',
    type: 'jumbo',
    name: 'JUMBO',
    containerCapacity: ['standard-40ft', 'high-cube-40ft', 'high-cube-45ft'],
    availability: 'available',
    cost: 280
  },
  {
    id: '6',
    type: 'custom',
    name: 'CUSTOM TRUCK',
    containerCapacity: ['custom'],
    availability: 'available',
    cost: 0
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
