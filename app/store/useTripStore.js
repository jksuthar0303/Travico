import { create } from 'zustand'

export const useTripStore = create((set) => ({
  destination: null,
  startDate: null,
  endDate: null,
  travelerCount: 0,
  travelers: [],
  selectedPlaces: [],

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  addTraveler: (trav) => set((s) => ({ travelers: [...s.travelers, trav] })),
  updateTraveler: (id, patch) => set((s) => ({
    travelers: s.travelers.map(t => t.id === id ? { ...t, ...patch } : t)
  })),
  removeTraveler: (id) => set((s) => ({
    travelers: s.travelers.filter(t => t.id !== id)
  })),
  reset: () => set({
    destination: null,
    startDate: null,
    endDate: null,
    travelerCount: 0,
    travelers: [],
    selectedPlaces: [],
  })
}))
