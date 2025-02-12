import { create } from "zustand";

const useHeroPictureStore = create((set) => ({
    heroPicture: null,
    setHeroPicture: (picture) => set({heroPicture: picture}),
    heroAlt: "",
    setHeroAlt: (alt) => set({heroAlt: alt}),
}))

export default useHeroPictureStore;