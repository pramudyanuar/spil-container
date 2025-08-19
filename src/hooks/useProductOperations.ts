import { useCallback } from 'react'
import { productService } from '@/services/productService'
import { useAppActions, useGroups, useLoadingState } from '@/hooks/useAppState'
import type { Product, ProductGroup, ProductType } from '@/types/product'

export function useProductOperations() {
  const groups = useGroups()
  const { isLoading } = useLoadingState()
  const { setGroups, setLoading, setError } = useAppActions()

  const loadGroups = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
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
      await productService.addGroup({
        name: `Group #${groups.length + 1}`,
        products: []
      })
      // Reload all groups to get the updated data from service
      const updatedGroups = await productService.getGroups()
      setGroups(updatedGroups)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add group')
    } finally {
      setLoading(false)
    }
  }, [groups.length, setGroups, setLoading, setError])

  const deleteGroup = useCallback(async (groupId: string) => {
    try {
      setLoading(true)
      const success = await productService.deleteGroup(groupId)
      if (success) {
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete group')
    } finally {
      setLoading(false)
    }
  }, [setGroups, setLoading, setError])

  const updateGroup = useCallback(async (groupId: string, updates: Partial<ProductGroup>) => {
    try {
      const updatedGroup = await productService.updateGroup(groupId, updates)
      if (updatedGroup) {
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update group')
    }
  }, [setGroups, setError])

  const addProduct = useCallback(async (groupId: string, type: ProductType) => {
    try {
      const newProduct = await productService.addProduct(groupId, {
        type,
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
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add product')
    }
  }, [setGroups, setError])

  const updateProduct = useCallback(async (groupId: string, productId: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await productService.updateProduct(groupId, productId, updates)
      
      if (updatedProduct) {
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update product')
    }
  }, [setGroups, setError])

  const deleteProduct = useCallback(async (groupId: string, productId: string) => {
    try {
      const success = await productService.deleteProduct(groupId, productId)
      if (success) {
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete product')
    }
  }, [setGroups, setError])

  const duplicateProduct = useCallback(async (groupId: string, productId: string) => {
    try {
      const duplicatedProduct = await productService.duplicateProduct(groupId, productId)
      if (duplicatedProduct) {
        // Reload all groups to get the updated data from service
        const updatedGroups = await productService.getGroups()
        setGroups(updatedGroups)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to duplicate product')
    }
  }, [setGroups, setError])

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
    updateGroup,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    exportGroups,
    importGroups
  }
}
