import * as React from "react";
import HeroPicture from "./HeroPicture";
import { useLanguageStore } from "../store";

export default function Hero() {
  const { texts, page } = useLanguageStore();

  let currentPage = page.split("/")[1];
  // console.log(currentPage);

  return (
    <>
      <div className="hero">
        <HeroPicture />
        <div className="hero hero--overlay">
          <div className="hero--insidebox">
            <h1 className="hero--title">
              {texts[currentPage]?.hero?.heroMainTitle || "lädt..."}
            </h1>
            <h2 className="hero--subtitle">
              {texts[currentPage]?.hero?.heroSubTitle || "lädt..."}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
