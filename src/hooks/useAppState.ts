import { useAppContext } from '@/context/AppContext'
import type { ProductGroup } from '@/types/product'

export function useAppActions() {
  const { dispatch } = useAppContext()

  return {
    setStep: (step: number) => dispatch({ type: 'SET_STEP', payload: step }),
    setShowLanding: (show: boolean) => dispatch({ type: 'SHOW_LANDING', payload: show }),
    setGroups: (groups: ProductGroup[]) => dispatch({ type: 'SET_GROUPS', payload: groups }),
    setUsePallets: (use: boolean) => dispatch({ type: 'SET_USE_PALLETS', payload: use }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error })
  }
}

// Selector hooks for specific state slices
export function useCurrentStep() {
  const { state } = useAppContext()
  return state.currentStep
}

export function useShowLanding() {
  const { state } = useAppContext()
  return state.showLanding
}

export function useGroups() {
  const { state } = useAppContext()
  return state.groups
}

export function useUsePallets() {
  const { state } = useAppContext()
  return state.usePallets
}

export function useLoadingState() {
  const { state } = useAppContext()
  return { isLoading: state.isLoading, error: state.error }
}
