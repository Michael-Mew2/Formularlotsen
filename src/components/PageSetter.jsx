import * as React from "react";
import { useHeroPictureStore, useLanguageStore } from "../store";
import PageContent from "./PageContent";

export default function PageSetter({ targetPage, pageBackground }) {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  React.useEffect(() => {
    setPage(`pages/${targetPage}`);
  }, []);

  React.useEffect(() => {
    if (texts[targetPage]?.hero) {
      setHeroPicture(texts[targetPage]?.hero?.heroPicture);
      setHeroAlt(texts[targetPage]?.hero?.heroPictureAlt);
    }
  }, [texts]);

  React.useEffect(() => {
    console.log(texts[targetPage]?.pageContent);
    console.log(hasPageContent);
  }, [texts]);

  const hasPageContent =
    texts[targetPage]?.pageContent &&
    Array.isArray(texts[targetPage]?.pageContent);

  return (
    <div
      id={targetPage}
      className={pageBackground ? pageBackground : "pageDefaultBackground"}
      lang={texts[targetPage]?.meta?.language || "de"}
    >
      {/* 👾 Metadata: */}
      <title>
        {texts[targetPage]?.meta?.title ||
          "Startseite Bremerhavener Formularlotsen"}
      </title>
      <meta
        name="description"
        content={
          texts[targetPage]?.meta?.content ||
          "Willkommen bei den Bremerhavener Formularlotsen, Ihre Ansprechpartner, falls Sie Probleme mit Ihren Formularen haben."
        }
      />

      {/* 📄 Content: */}
      {hasPageContent && (
        <PageContent pageContent={texts[targetPage]?.pageContent} />
      )}
    </div>
  );
}
