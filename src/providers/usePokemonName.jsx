import { create } from 'zustand'

export const usePokemonName = create((set) => ({
    name: "",
    pokemonUpdate: (newName) => set({ name : newName }),
  }))