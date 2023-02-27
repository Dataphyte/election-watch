import { create } from 'zustand';

export const stateStore = create((set) => ({
  selectedState: null,
  selectedLga: null,
  setSelectedState: (selectedState) => set({ selectedState }),
  setSelectedLga: (selectedLga) => set({ selectedLga }),
}));
