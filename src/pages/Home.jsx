import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useHeroPictureStore, useLanguageStore } from "../store";

export default function Home() {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  useEffect(() => {
    setHeroPicture("images/heroImages/AdobeStock_548190067.jpeg");
    setHeroAlt("Personen bei einem Beratungsgespräch");
    setPage("pages/startseite");
  }, []);

  // Neuer useEffect, um zu warten, bis die Texte geladen sind
  // useEffect(() => {
  //   if (texts && Object.keys(texts).length > 0) {
  //     console.warn("From JSX (nach Laden der Texte):", texts, texts.startseite.title);
  //   }
  // }, [texts]);

  return (
    <div className="home">

      <h1>{texts.startseite?.title || "lädt..."}</h1>
      <p>{texts.startseite?.description || "lädt..."}</p>
    </div>
  );
}
