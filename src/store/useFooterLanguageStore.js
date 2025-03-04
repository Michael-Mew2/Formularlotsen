import { create } from "zustand";

const useFooterLanguageStore = create((set) => ({
    footerTexts: {},

    loadFooter: async (language) => {
        try {
            const response = await fetch(`texte/locales/components/footer/${language}.json`);
            if(!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

            const data = await response.json();
            set({footerTexts: data});
        } catch (error) {
            console.error(`Fehler beim Laden des Footers: ${language}.json`, error);
            set({footerTexts: {}});
        }
    }
}));

export default useFooterLanguageStore;