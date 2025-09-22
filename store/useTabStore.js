// store/useTabStore.js
import { create } from "zustand";

const useTabStore = create((set) => ({
  uploading: true,
  setUploading: (val) => set({ uploading: val }),
}));

export default useTabStore;
