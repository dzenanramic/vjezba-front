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
  removeShownPhoto: (idOrUrl) =>
    set((state) => {
      let id = idOrUrl;
      if (typeof idOrUrl === "string") {
        const found = state.editedPhotos.find((p) => p.url === idOrUrl);
        if (found) id = found.id;
      }
      if (typeof id !== "number") return {};
      const photoObj = state.editedPhotos.find((p) => p.id === id);
      if (photoObj) {
        try {
          URL.revokeObjectURL(photoObj.url);
        } catch {}
      }
      return {
        shownPhotos: state.shownPhotos.filter((pid) => pid !== id),
        editedPhotos: state.editedPhotos.filter((p) => p.id !== id),
      };
    }),
  removeOriginalPic: (url) =>
    set((state) => {
      if (typeof url !== "string") return {};
      const idx = state.picURLs.indexOf(url);
      if (idx === -1) return {};
      try {
        URL.revokeObjectURL(state.picURLs[idx]);
      } catch {}
      const newPicURLs = state.picURLs.filter((u, i) => i !== idx);
      const newPics = state.pics.filter((_, i) => i !== idx);
      return { picURLs: newPicURLs, pics: newPics };
    }),
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
