import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useHeroPictureStore, useLanguageStore } from "../store";

export default function Home() {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  useEffect(() => {
    setPage("pages/startseite");
  }, []);

  useEffect(() => {
    if (texts.startseite?.hero) {
      setHeroPicture(texts.startseite.hero?.heroPicture);
      setHeroAlt(texts.startseite?.hero?.heroPictureAlt);
    }
  }, [texts]);

  return (
    <div className="home">
      <h1>{texts.startseite?.pageContent?.title || "lädt..."}</h1>
      <p>{texts.startseite?.pageContent?.description || "lädt..."}</p>
      <h3>
        {texts.startseite?.pageContent?.firstList?.listTitle || "lädt..."}
      </h3>
      <ul>
        {texts.startseite?.pageContent?.firstList?.listContent?.map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>
    </div>
  );
}
