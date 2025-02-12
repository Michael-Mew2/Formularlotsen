import { create } from "zustand";
import useNavigationLanguageStore from "./useNavigationLanguageStore";

const getStoredLanguage = () => localStorage.getItem("language") || "de";

const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),
  page: "startseite",
  texts: {},

  // Setzt die Sprache und aktualisiert alle Texte (Seite + Navigation)
  setLanguage: (language) => {
    localStorage.setItem("language", language);
    set({ language });

    // Lade alle Inhalte neu (Seiteninhalte + Navigation)
    loadTexts(useLanguageStore.getState().page, language, set);
    useNavigationLanguageStore.getState().loadNavigation(language);
  },

  setPage: (page) => {
    set((state) => {
      loadTexts(page, state.language, set);
      return { page };
    });
  },
}));

const loadTexts = async (page, language, set) => {
  try {
    const response = await fetch(`texte/locales/${page}/${language}.json`);
    if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

    const data = await response.json();
    set({ texts: data });
  } catch (error) {
    console.error(`Fehler beim Laden der Datei: ${page}/${language}.json`, error);
    set({ texts: {} });
  }
};

export default useLanguageStore;
