import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { ProductGroup } from '@/types/product'

interface AppState {
  currentStep: number
  showLanding: boolean
  groups: ProductGroup[]
  usePallets: boolean
  isLoading: boolean
  error: string | null
  mode: 'batch' | 'interactive'
}

type AppAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SHOW_LANDING'; payload: boolean }
  | { type: 'SET_GROUPS'; payload: ProductGroup[] }
  | { type: 'SET_USE_PALLETS'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MODE'; payload: 'batch' | 'interactive' }

const initialState: AppState = {
  currentStep: 1,
  showLanding: true,
  groups: [],
  usePallets: false,
  isLoading: false,
  error: null,
  mode: 'batch'
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SHOW_LANDING':
      return { ...state, showLanding: action.payload }
    case 'SET_GROUPS':
      return { ...state, groups: action.payload }
    case 'SET_USE_PALLETS':
      return { ...state, usePallets: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
