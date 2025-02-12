import { create } from "zustand";
// import useLanguageStore from "./useLanguageStore"; // Hauptstore importieren

const useNavigationLanguageStore = create((set) => ({
  navigationTexts: {},

  loadNavigation: async (language) => {
    try {
      const response = await fetch(`texte/locales/components/navigation/${language}.json`);
      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

      const data = await response.json();
      set({ navigationTexts: data });
    } catch (error) {
      console.error(`Fehler beim Laden der Navigation: ${language}.json`, error);
      set({ navigationTexts: {} });
    }
  }
}));

export default useNavigationLanguageStore;
