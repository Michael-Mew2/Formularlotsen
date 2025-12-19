import * as React from "react";
import { useHeroPictureStore, useLanguageStore } from "../store";
import PageContent from "../components/PageContent";

export default function Home() {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  React.useEffect(() => {
    setPage("pages/startseite");
  }, []);

  React.useEffect(() => {
    if (texts.startseite?.hero) {
      setHeroPicture(texts.startseite.hero?.heroPicture);
      setHeroAlt(texts.startseite?.hero?.heroPictureAlt);
    }
  }, [texts]);

  React.useEffect(() => {
    console.log(texts.startseite?.meta?.content);
  }, [texts]);

  const hasPageContent = texts.startseite?.pageContent && Array.isArray(texts.startseite?.pageContent)

  return (
    <div id="home" lang={texts.startseite?.meta?.language} aria-live="polite">

      {/* 👾 Metadata: */}
      <title>
        {texts.startseite?.meta?.title ||
          "Startseite Bremerhavener Formularlotsen"}
      </title>
      <meta
        name="description"
        content={
          texts.startseite?.meta?.content ||
          "Willkommen bei den Bremerhavener Formularlotsen, Ihre Ansprechpartner, falls Sie Probleme mit Ihren Formularen haben."
        }
      />

      {/* 📄 Content: */}
      {hasPageContent &&<PageContent pageContent={texts.startseite?.pageContent} />}
    </div>
  );
}
