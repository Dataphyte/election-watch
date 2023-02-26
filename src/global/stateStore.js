import { create } from 'zustand';

export const stateStore = create((set) => ({
  selectedState: null,
  setSelectedState: (selectedState) => set({ selectedState }),
}));
