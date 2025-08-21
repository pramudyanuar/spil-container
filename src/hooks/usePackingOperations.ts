import { usePackingContext } from '@/context/PackingContext'
import type { Container } from '@/types/container'
import type { Product } from '@/types/product'
import type { PackingResult } from '@/types/packing'

// 3D Bin Packing Algorithm - simplified version
class BinPacker {
  private container: Container
  private packedProducts: Array<{
    product: Product
    position: { x: number; y: number; z: number }
  }>

  constructor(container: Container) {
    this.container = container
    this.packedProducts = []
  }

  setPackedProducts(products: Array<{ product: Product; position: { x: number; y: number; z: number } }>) {
    this.packedProducts = products
  }

  canFitProduct(product: Product): PackingResult {
    const containerDims = this.container.dimensions
    
    // Check if product fits in container dimensions at all
    if (
      product.length > containerDims.length ||
      product.width > containerDims.width ||
      product.height > containerDims.height
    ) {
      return { canFit: false }
    }

    // Try different orientations
    const orientations = [
      { length: product.length, width: product.width, height: product.height, rotation: { x: 0, y: 0, z: 0 } },
      { length: product.width, width: product.length, height: product.height, rotation: { x: 0, y: 0, z: 90 } },
      { length: product.height, width: product.width, height: product.length, rotation: { x: 90, y: 0, z: 0 } },
    ]

    for (const orientation of orientations) {
      if (
        orientation.length > containerDims.length ||
        orientation.width > containerDims.width ||
        orientation.height > containerDims.height
      ) {
        continue
      }

      const position = this.findBestPosition(orientation)
      if (position) {
        return {
          canFit: true,
          position,
          rotation: orientation.rotation,
        }
      }
    }

    return { canFit: false }
  }

  private findBestPosition(productDims: { length: number; width: number; height: number }): { x: number; y: number; z: number } | null {
    const containerDims = this.container.dimensions
    const step = 50 // mm step size for positioning

    // Start from bottom-left-front corner
    for (let y = 0; y <= containerDims.height - productDims.height; y += step) {
      for (let z = 0; z <= containerDims.width - productDims.width; z += step) {
        for (let x = 0; x <= containerDims.length - productDims.length; x += step) {
          const position = { x, y, z }
          
          if (this.isPositionFree(position, productDims)) {
            return position
          }
        }
      }
    }

    return null
  }

  private isPositionFree(
    position: { x: number; y: number; z: number },
    productDims: { length: number; width: number; height: number }
  ): boolean {
    const newBox = {
      x1: position.x,
      y1: position.y,
      z1: position.z,
      x2: position.x + productDims.length,
      y2: position.y + productDims.height,
      z2: position.z + productDims.width,
    }

    // Check collision with existing products
    for (const packed of this.packedProducts) {
      const existingBox = {
        x1: packed.position.x,
        y1: packed.position.y,
        z1: packed.position.z,
        x2: packed.position.x + packed.product.length,
        y2: packed.position.y + packed.product.height,
        z2: packed.position.z + packed.product.width,
      }

      if (this.boxesIntersect(newBox, existingBox)) {
        return false
      }
    }

    return true
  }

  private boxesIntersect(
    box1: { x1: number; y1: number; z1: number; x2: number; y2: number; z2: number },
    box2: { x1: number; y1: number; z1: number; x2: number; y2: number; z2: number }
  ): boolean {
    return !(
      box1.x2 <= box2.x1 ||
      box2.x2 <= box1.x1 ||
      box1.y2 <= box2.y1 ||
      box2.y2 <= box1.y1 ||
      box1.z2 <= box2.z1 ||
      box2.z2 <= box1.z1
    )
  }
}

export function usePackingOperations() {
  const { state, dispatch } = usePackingContext()

  const selectContainer = (container: Container) => {
    dispatch({ type: 'SELECT_CONTAINER', payload: container })
  }

  const addProduct = async (product: Product): Promise<PackingResult> => {
    if (!state.selectedContainer) {
      throw new Error('No container selected')
    }

    dispatch({ type: 'SET_CALCULATING', payload: true })

    try {
      // Create bin packer instance
      const packer = new BinPacker(state.selectedContainer)
      
      // Set current packed products
      if (state.currentSession) {
        const packedProducts = state.currentSession.packedProducts.map(p => ({
          product: p,
          position: p.position
        }))
        packer.setPackedProducts(packedProducts)
      }

      // Check if product can fit
      const result = packer.canFitProduct(product)

      if (result.canFit) {
        dispatch({ type: 'ADD_PRODUCT', payload: { product, result } })
      }

      return result
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
      return { canFit: false }
    } finally {
      dispatch({ type: 'SET_CALCULATING', payload: false })
    }
  }

  const removeProduct = (productId: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId })
  }

  const updateProductPosition = (productId: string, position: { x: number; y: number; z: number }) => {
    dispatch({ type: 'UPDATE_PRODUCT_POSITION', payload: { productId, position } })
  }

  const clearSession = () => {
    dispatch({ type: 'CLEAR_SESSION' })
  }

  const checkProductFit = async (product: Product): Promise<PackingResult> => {
    if (!state.selectedContainer) {
      return { canFit: false }
    }

    const packer = new BinPacker(state.selectedContainer)
    
    if (state.currentSession) {
      const packedProducts = state.currentSession.packedProducts.map(p => ({
        product: p,
        position: p.position
      }))
      packer.setPackedProducts(packedProducts)
    }

    return packer.canFitProduct(product)
  }

  return {
    selectedContainer: state.selectedContainer,
    currentSession: state.currentSession,
    isCalculating: state.isCalculating,
    error: state.error,
    selectContainer,
    addProduct,
    removeProduct,
    updateProductPosition,
    clearSession,
    checkProductFit,
  }
}
