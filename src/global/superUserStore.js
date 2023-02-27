import { create } from 'zustand';

export const superUserStore = create((set) => ({
  superUser: null,
  setSuperUser: (superUser) => set({ superUser }),
}));
