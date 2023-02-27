import { create } from 'zustand';

export const puStore = create((set) => ({
  pu: '',
  setPu: (pu) => set({ pu }),
}));
