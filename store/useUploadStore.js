// store/useUploadStore.js
import { create } from "zustand";

const useUploadStore = create((set) => ({
  pics: [],
  picURLs: [],
  loading: false,
  error: null,
  editedPhotos: [],
  badgeCount: 0,

  addPic: (file) =>
    set((state) => ({
      pics: [...state.pics, file],
      picURLs: [...state.picURLs, URL.createObjectURL(file)],
    })),

  setLoading: (loading) => set({ loading }),
  setEditedPhotos: (photo) =>
    set((state) => ({
      editedPhotos: [...state.editedPhotos, URL.createObjectURL(photo)],
    })),
  setError: (error) => set({ error }),
  incrementBadge: () => set((state) => ({ badgeCount: state.badgeCount + 1 })),
  resetBadge: () => set({ badgeCount: 0 }),
  resetPhotos: () => set({ pics: [], picURLs: [] }),
  reset: () =>
    set({
      pics: [],
      picURLs: [],
      error: null,
      loading: false,
      editedPhotos: [],
    }),
}));

export default useUploadStore;
