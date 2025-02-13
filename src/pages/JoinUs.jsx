import * as React from "react";
import { useHeroPictureStore, useLanguageStore } from "../store";

export default function JoinUs() {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  React.useEffect(() => {
    setPage("pages/join");
  }, []);

  React.useEffect(() => {
    if (texts.join?.hero) {
      setHeroPicture(texts.join?.hero?.heroPicture);
      setHeroAlt(texts.join?.hero?.heroPictureAlt);
    }
  });

  return (
    <div className="joinUs">
      <h1>{texts.join?.pageContent?.title || "lädt..."}</h1>
      <p>{texts.join?.pageContent?.description || "lädt..."}</p>
    </div>
  );
}
