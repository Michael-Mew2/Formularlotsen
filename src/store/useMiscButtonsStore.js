import { create } from "zustand";

const useMiscButtonsStore = create((set) => ({
  buttonTexts: {},

  loadButtonText: async (language) => {
    try {
      const response = await fetch(
        `texte/locales/components/buttons/${language}.json`,
      );
      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

      const data = await response.json();
      set({ buttonTexts: data });
    } catch (error) {
      console.error(
        `Fehler beim Laden der Button-Texte: ${language}.json`,
        error,
      );
      set({ buttonTexts: {} });
    }
  },
}));

export default useMiscButtonsStore;
