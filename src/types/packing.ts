import type { Container } from './container'
import type { Product } from './product'

export interface PackedProduct extends Product {
  position: {
    x: number
    y: number
    z: number
  }
  rotation?: {
    x: number
    y: number
    z: number
  }
  isOptimal: boolean
}

export interface PackingSession {
  id: string
  container: Container
  packedProducts: PackedProduct[]
  totalVolume: number
  usedVolume: number
  remainingVolume: number
  utilizationPercentage: number
}

export interface PackingResult {
  canFit: boolean
  position?: {
    x: number
    y: number
    z: number
  }
  rotation?: {
    x: number
    y: number
    z: number
  }
  alternativePositions?: Array<{
    x: number
    y: number
    z: number
    rotation?: {
      x: number
      y: number
      z: number
    }
  }>
}
