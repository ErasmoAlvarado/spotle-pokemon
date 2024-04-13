import { create } from 'zustand'

export const useCounter = create((set) => ({
    counter: 0,
    update: () => set((state)=>({ counter: state.counter+1 })),
    reset: () => set((state)=>({ counter: 0 })),
  }))