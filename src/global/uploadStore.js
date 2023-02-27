import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUploadStore = create(
  persist(
    (set, get) => ({
      pages: 0,
      setPages: (pages) => set({ pages }),
    }),
    {
      name: '____gsas',
    }
  )
);
