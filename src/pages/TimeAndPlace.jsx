import * as React from "react";
import { useHeroPictureStore, useLanguageStore } from "../store";
import PageContent from "../components/PageContent";

export default function TimeAndPlace() {
  const { texts, setPage } = useLanguageStore();

  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  React.useEffect(() => {
    setPage("pages/zeitenUndStandorte");
  }, []);

  React.useEffect(() => {
    if (texts.zeitenUndStandorte?.hero) {
      setHeroPicture(texts.zeitenUndStandorte?.hero?.heroPicture);
      setHeroAlt(texts.zeitenUndStandorte?.hero?.heroPictureAlt);
    }
  }, [texts]);

  React.useEffect(() => {
    console.log(texts.zeitenUndStandorte?.meta?.content);
  }, [texts]);

  const hasPageContent =
    texts.zeitenUndStandorte?.pageContent &&
    Array.isArray(texts.zeitenUndStandorte.pageContent);

  console.log(texts);

  return (
    <div className="timeAndPlace">
      {/* 👾 Metadata: */}
      <title>
        {texts.zeitenUndStandorte?.meta?.title || "Zeiten und Standorte"}
      </title>
      <meta
        name="description"
        content={
          texts.zeitenUndStandorte?.meta?.content ||
          "Hier sehen Sie wo wir wann zu finden sind"
        }
      />

      {/* 📄 Content: */}
      {hasPageContent && (
        <PageContent pageContent={texts.zeitenUndStandorte?.pageContent} />
      )}
    </div>
  );
}
