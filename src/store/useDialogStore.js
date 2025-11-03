import { create } from "zustand";

const useDialogStore = create((set) => ({
  isDialogOpen: false,
  dialogContent: null,
  openDialog: (content) => set({ isDialogOpen: true, dialogContent: content }),
  closeDialog: () => set({ isDialogOpen: false, dialogContent: null }),
}));

export default useDialogStore;
