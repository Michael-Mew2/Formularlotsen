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
          <h1
            style={{
              backgroundColor: "green",
              margin: "20px",
              display: "flex",
            }}
          >
            {texts[currentPage]?.hero?.heroMainTitle || "lädt..."}
          </h1>
          <h2
            style={{
              backgroundColor: "green",
              margin: "20px",
              display: "flex",
            }}
          >
            {texts[currentPage]?.hero?.heroSubTitle || "lädt..."}
          </h2>
        </div>
      </div>
    </>
  );
}
