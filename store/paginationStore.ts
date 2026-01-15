import { create } from 'zustand'

interface PaginationState {
  resetSignal: number
  reset: () => void
}

const usePaginationStore = create<PaginationState>((set) => ({
  resetSignal: 0,
  reset: () => set((state) => ({ resetSignal: state.resetSignal + 1 })),
}))

export default usePaginationStore
