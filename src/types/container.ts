export interface Container {
  id: string
  type: 'standard-20ft' | 'standard-40ft' | 'high-cube-40ft'
  name: string
  dimensions: {
    length: number // in mm
    width: number  // in mm
    height: number // in mm
  }
  maxWeight: number // in kg
  availability: 'available' | 'limited' | 'unavailable'
  cost: number // in USD
}

export interface Truck {
  id: string
  type: 'standard' | 'heavy-duty' | 'specialized'
  name: string
  containerCapacity: string[]
  availability: 'available' | 'limited' | 'unavailable'
  cost: number // in USD per day
}

export interface ContainerAssignment {
  containerId: string
  utilization: number
  assignedProducts: {
    productId: string
    groupId: string
    quantity: number
  }[]
}

export interface StuffingResult {
  totalContainers: number
  averageUtilization: number
  totalCost: number
  containerAssignments: ContainerAssignment[]
}
