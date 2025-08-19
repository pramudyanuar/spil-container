import type { Product, ProductGroup } from '@/types/product'

// Mock data - replace with actual API calls
const mockGroups: ProductGroup[] = [
]

class ProductService {
  private groups: ProductGroup[] = []

  constructor() {
    this.groups = [...mockGroups]
  }

  async getGroups(): Promise<ProductGroup[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.groups]), 100)
    })
  }

  async addGroup(group: Omit<ProductGroup, 'id'>): Promise<ProductGroup> {
    const newGroup: ProductGroup = {
      ...group,
      id: Date.now().toString()
    }
    this.groups.push(newGroup)
    return newGroup
  }

  async updateGroup(groupId: string, updates: Partial<ProductGroup>): Promise<ProductGroup | null> {
    const index = this.groups.findIndex(g => g.id === groupId)
    if (index === -1) return null
    
    this.groups[index] = { ...this.groups[index], ...updates }
    return this.groups[index]
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    const index = this.groups.findIndex(g => g.id === groupId)
    if (index === -1) return false
    
    this.groups.splice(index, 1)
    return true
  }

  async addProduct(groupId: string, product: Omit<Product, 'id'>): Promise<Product | null> {
    const group = this.groups.find(g => g.id === groupId)
    if (!group) return null

    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    }

    group.products.push(newProduct)
    return newProduct
  }

  async updateProduct(groupId: string, productId: string, updates: Partial<Product>): Promise<Product | null> {
    const group = this.groups.find(g => g.id === groupId)
    if (!group) return null

    const productIndex = group.products.findIndex(p => p.id === productId)
    if (productIndex === -1) return null

    group.products[productIndex] = { ...group.products[productIndex], ...updates }
    return group.products[productIndex]
  }

  async deleteProduct(groupId: string, productId: string): Promise<boolean> {
    const group = this.groups.find(g => g.id === groupId)
    if (!group) return false

    const productIndex = group.products.findIndex(p => p.id === productId)
    if (productIndex === -1) return false

    group.products.splice(productIndex, 1)
    return true
  }

  async duplicateProduct(groupId: string, productId: string): Promise<Product | null> {
    const group = this.groups.find(g => g.id === groupId)
    if (!group) return null

    const product = group.products.find(p => p.id === productId)
    if (!product) return null

    const duplicatedProduct: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copy)`
    }

    group.products.push(duplicatedProduct)
    return duplicatedProduct
  }

  async exportGroups(): Promise<string> {
    // Simulate export functionality
    return JSON.stringify(this.groups, null, 2)
  }

  async importGroups(data: string): Promise<ProductGroup[]> {
    // Simulate import functionality
    try {
      const importedGroups = JSON.parse(data) as ProductGroup[]
      this.groups = importedGroups
      return this.groups
    } catch {
      throw new Error('Invalid data format')
    }
  }
}

export const productService = new ProductService()
