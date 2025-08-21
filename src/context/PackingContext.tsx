import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Container } from '@/types/container'
import type { Product } from '@/types/product'
import type { PackedProduct, PackingSession, PackingResult } from '@/types/packing'

interface PackingState {
  selectedContainer: Container | null
  currentSession: PackingSession | null
  isCalculating: boolean
  error: string | null
}

type PackingAction =
  | { type: 'SELECT_CONTAINER'; payload: Container }
  | { type: 'ADD_PRODUCT'; payload: { product: Product; result: PackingResult } }
  | { type: 'REMOVE_PRODUCT'; payload: string } // product id
  | { type: 'UPDATE_PRODUCT_POSITION'; payload: { productId: string; position: { x: number; y: number; z: number } } }
  | { type: 'CLEAR_SESSION' }
  | { type: 'SET_CALCULATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: PackingState = {
  selectedContainer: null,
  currentSession: null,
  isCalculating: false,
  error: null
}

function packingReducer(state: PackingState, action: PackingAction): PackingState {
  switch (action.type) {
    case 'SELECT_CONTAINER':
      return {
        ...state,
        selectedContainer: action.payload,
        currentSession: {
          id: Date.now().toString(),
          container: action.payload,
          packedProducts: [],
          totalVolume: action.payload.dimensions.length * action.payload.dimensions.width * action.payload.dimensions.height,
          usedVolume: 0,
          remainingVolume: action.payload.dimensions.length * action.payload.dimensions.width * action.payload.dimensions.height,
          utilizationPercentage: 0
        }
      }
    
    case 'ADD_PRODUCT': {
      if (!state.currentSession || !action.payload.result.canFit) return state
      
      const newPackedProduct: PackedProduct = {
        ...action.payload.product,
        position: action.payload.result.position!,
        rotation: action.payload.result.rotation,
        isOptimal: true
      }
      
      const productVolume = action.payload.product.length * action.payload.product.width * action.payload.product.height
      const newUsedVolume = state.currentSession.usedVolume + productVolume
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          packedProducts: [...state.currentSession.packedProducts, newPackedProduct],
          usedVolume: newUsedVolume,
          remainingVolume: state.currentSession.totalVolume - newUsedVolume,
          utilizationPercentage: Math.round((newUsedVolume / state.currentSession.totalVolume) * 100)
        }
      }
    }
    
    case 'REMOVE_PRODUCT': {
      if (!state.currentSession) return state
      
      const productToRemove = state.currentSession.packedProducts.find(p => p.id === action.payload)
      if (!productToRemove) return state
      
      const removedProductVolume = productToRemove.length * productToRemove.width * productToRemove.height
      const updatedUsedVolume = state.currentSession.usedVolume - removedProductVolume
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          packedProducts: state.currentSession.packedProducts.filter(p => p.id !== action.payload),
          usedVolume: updatedUsedVolume,
          remainingVolume: state.currentSession.totalVolume - updatedUsedVolume,
          utilizationPercentage: Math.round((updatedUsedVolume / state.currentSession.totalVolume) * 100)
        }
      }
    }
    
    case 'UPDATE_PRODUCT_POSITION':
      if (!state.currentSession) return state
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          packedProducts: state.currentSession.packedProducts.map(p =>
            p.id === action.payload.productId
              ? { ...p, position: action.payload.position }
              : p
          )
        }
      }
    
    case 'CLEAR_SESSION':
      return {
        ...state,
        currentSession: state.selectedContainer ? {
          id: Date.now().toString(),
          container: state.selectedContainer,
          packedProducts: [],
          totalVolume: state.selectedContainer.dimensions.length * state.selectedContainer.dimensions.width * state.selectedContainer.dimensions.height,
          usedVolume: 0,
          remainingVolume: state.selectedContainer.dimensions.length * state.selectedContainer.dimensions.width * state.selectedContainer.dimensions.height,
          utilizationPercentage: 0
        } : null
      }
    
    case 'SET_CALCULATING':
      return { ...state, isCalculating: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    default:
      return state
  }
}

interface PackingContextValue {
  state: PackingState
  dispatch: React.Dispatch<PackingAction>
}

const PackingContext = createContext<PackingContextValue | undefined>(undefined)

interface PackingProviderProps {
  children: ReactNode
}

export function PackingProvider({ children }: PackingProviderProps) {
  const [state, dispatch] = useReducer(packingReducer, initialState)

  return (
    <PackingContext.Provider value={{ state, dispatch }}>
      {children}
    </PackingContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePackingContext() {
  const context = useContext(PackingContext)
  if (context === undefined) {
    throw new Error('usePackingContext must be used within a PackingProvider')
  }
  return context
}
