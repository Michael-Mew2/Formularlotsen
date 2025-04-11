import * as React from "react";
import { useHeroPictureStore, useLanguageStore } from "../store";
import PageContent from "../components/PageContent";

export default function Backbone() {
  const { texts, setPage } = useLanguageStore();
  const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
  const setHeroAlt = useHeroPictureStore((state) => state.setHeroAlt);

  React.useEffect(() => {
    setPage("pages/backbone");
  }, []);

  React.useEffect(() => {
    if (texts.backbone?.hero) {
      setHeroPicture(texts.backbone.hero?.heroPicture);
      setHeroAlt(texts.backbone.hero?.heroPictureAlt);
    }
  }, [texts]);

  React.useEffect(() => {
    console.log(texts.backbone?.meta?.content);
  }, [texts]);

  const hasPageContent =
    texts.backbone?.pageContent && Array.isArray(texts.backbone?.pageContent);
  return (
    <div id="backbone">
      {/* 👾 Metadata: */}
      <title>{texts.backbone?.meta?.title || "Drawingboard"}</title>
      <meta name="description" content={texts.backbone?.meta?.content || ""} />

      {/* 📄 Content: */}
      {hasPageContent && (
        <PageContent pageContent={texts.backbone?.pageContent} />
      )}
    </div>
  );
}
