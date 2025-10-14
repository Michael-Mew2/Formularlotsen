import { create } from "zustand";

const useDialogStore = create((set) => ({
    isDialogOpen: false,
    selectedLocation: null,
    openDialog: (location) => set({ isDialogOpen: true, selectedLocation: location }),
    closeDialog: () => set({ isDialogOpen: false, selectedLocation: null }),
}));

export default useDialogStore;