import { useState, useCallback } from 'react'
import { containerService } from '@/services/containerService'
import type { Container, Truck, StuffingResult } from '@/types/container'
import type { ProductGroup } from '@/types/product'

export function useContainerOperations() {
  const [containers, setContainers] = useState<Container[]>([])
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [stuffingResult, setStuffingResult] = useState<StuffingResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadContainers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const loadedContainers = await containerService.getContainers()
      setContainers(loadedContainers)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load containers')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadTrucks = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const loadedTrucks = await containerService.getTrucks()
      setTrucks(loadedTrucks)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load trucks')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const calculateOptimization = useCallback(async (groups: ProductGroup[]) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await containerService.calculateOptimization(groups)
      setStuffingResult(result)
      return result
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to calculate optimization')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getContainerById = useCallback(async (id: string) => {
    try {
      return await containerService.getContainerById(id)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get container')
      return null
    }
  }, [])

  const getTruckById = useCallback(async (id: string) => {
    try {
      return await containerService.getTruckById(id)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get truck')
      return null
    }
  }, [])

  return {
    containers,
    trucks,
    stuffingResult,
    isLoading,
    error,
    loadContainers,
    loadTrucks,
    calculateOptimization,
    getContainerById,
    getTruckById
  }
}
