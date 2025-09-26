// store/useUploadStore.js
import { create } from "zustand";

let idCounter = 0;
const genId = () => ++idCounter;

const useUploadStore = create((set) => ({
  pics: [],
  picURLs: [],
  loading: false,
  error: null,
  editedPhotos: [],
  shownPhotos: [],
  badgeCount: 0,

  addPic: (file) =>
    set((state) => ({
      pics: [...state.pics, file],
      picURLs: [...state.picURLs, URL.createObjectURL(file)],
    })),

  setLoading: (loading) => set({ loading }),
  setEditedPhotos: (photo) =>
    set((state) => {
      const url = URL.createObjectURL(photo);
      const id = genId();
      return {
        editedPhotos: [...state.editedPhotos, { id, url }],
      };
    }),
  setShownPhotos: (photoUrlOrId) =>
    set((state) => {
      // Accept either id or url; normalize to id
      let id = photoUrlOrId;
      if (typeof photoUrlOrId === "string") {
        const found = state.editedPhotos.find((p) => p.url === photoUrlOrId);
        if (found) id = found.id;
      }
      if (typeof id !== "number") return {}; // no change if not found
      if (state.shownPhotos.includes(id)) return {}; // avoid duplicates
      return { shownPhotos: [...state.shownPhotos, id] };
    }),
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
      shownPhotos: [],
    }),
}));

export default useUploadStore;
