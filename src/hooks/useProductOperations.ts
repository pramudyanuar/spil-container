import { useCallback } from 'react'
import { productService } from '@/services/productService'
import { useAppActions, useGroups, useLoadingState } from '@/hooks/useAppState'
import type { Product } from '@/types/product'

export function useProductOperations() {
  const groups = useGroups()
  const { isLoading } = useLoadingState()
  const { setGroups, setLoading, setError } = useAppActions()

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const loadedGroups = await productService.getGroups()
      setGroups(loadedGroups)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load groups')
    } finally {
      setLoading(false)
    }
  }, [setGroups, setLoading, setError])

  const addGroup = useCallback(async () => {
    try {
      setLoading(true)
      const newGroup = await productService.addGroup({
        name: `Group #${groups.length + 1}`,
        products: []
      })
      setGroups([...groups, newGroup])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add group')
    } finally {
      setLoading(false)
    }
  }, [groups, setGroups, setLoading, setError])

  const deleteGroup = useCallback(async (groupId: string) => {
    try {
      setLoading(true)
      const success = await productService.deleteGroup(groupId)
      if (success) {
        setGroups(groups.filter(g => g.id !== groupId))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete group')
    } finally {
      setLoading(false)
    }
  }, [groups, setGroups, setLoading, setError])

  const addProduct = useCallback(async (groupId: string) => {
    try {
      const newProduct = await productService.addProduct(groupId, {
        type: 'box',
        name: 'New Product',
        length: 100,
        width: 100,
        height: 100,
        weight: 1,
        quantity: 1,
        color: '#22c55e',
        canStack: false
      })

      if (newProduct) {
        setGroups(groups.map(group => 
          group.id === groupId 
            ? { ...group, products: [...group.products, newProduct] }
            : group
        ))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add product')
    }
  }, [groups, setGroups, setError])

  const updateProduct = useCallback(async (groupId: string, productId: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await productService.updateProduct(groupId, productId, updates)
      
      if (updatedProduct) {
        setGroups(groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                products: group.products.map(product =>
                  product.id === productId ? updatedProduct : product
                )
              }
            : group
        ))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update product')
    }
  }, [groups, setGroups, setError])

  const deleteProduct = useCallback(async (groupId: string, productId: string) => {
    try {
      const success = await productService.deleteProduct(groupId, productId)
      if (success) {
        setGroups(groups.map(group =>
          group.id === groupId
            ? { ...group, products: group.products.filter(p => p.id !== productId) }
            : group
        ))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete product')
    }
  }, [groups, setGroups, setError])

  const duplicateProduct = useCallback(async (groupId: string, productId: string) => {
    try {
      const duplicatedProduct = await productService.duplicateProduct(groupId, productId)
      if (duplicatedProduct) {
        setGroups(groups.map(g =>
          g.id === groupId
            ? { ...g, products: [...g.products, duplicatedProduct] }
            : g
        ))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to duplicate product')
    }
  }, [groups, setGroups, setError])

  const exportGroups = useCallback(async () => {
    try {
      const exportData = await productService.exportGroups()
      // Trigger download
      const blob = new Blob([exportData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'products.json'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to export groups')
    }
  }, [setError])

  const importGroups = useCallback(async (data: string) => {
    try {
      setLoading(true)
      const importedGroups = await productService.importGroups(data)
      setGroups(importedGroups)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import groups')
    } finally {
      setLoading(false)
    }
  }, [setGroups, setLoading, setError])

  return {
    groups,
    isLoading,
    loadGroups,
    addGroup,
    deleteGroup,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    exportGroups,
    importGroups
  }
}
