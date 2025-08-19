export interface Container {
  id: string
  type: 'standard-20ft' | 'standard-40ft' | 'high-cube-40ft' | 'high-cube-45ft' | 
        'open-top-20ft' | 'open-top-40ft' | 'flatrack-20ft' | 'flatrack-40ft' |
        'flatrack-collapsible-20ft' | 'flatrack-collapsible-40ft' | 
        'platform-20ft' | 'platform-40ft' | 'refrigerated-20ft' | 'refrigerated-40ft' |
        'bulk-20ft' | 'tank-20ft' | 'custom'
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
  type: 'tautliner' | 'refrigerated' | 'isotherm' | 'mega-trailer' | 'jumbo' | 'custom'
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
