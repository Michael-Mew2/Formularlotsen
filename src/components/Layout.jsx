import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Hero from "./Hero";
import { useLanguageStore } from "../store";

export default function Layout() {

  // Funktion um alle Texte die von rechts nach links geschrieben werden richtig anzuzeigen:
  useEffect(() => {
    const language = useLanguageStore.getState().language;
    document.documentElement.lang = language;
    document.documentElement.dir = ["ar", "fa", "he", "ur"].includes(language)
      ? "rtl"
      : "ltr";
  });

  return (
    <>
      {/* 👾 Metadata: */}
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://use.typekit.net/ran2vxb.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* 📄 Content: */}
      <Header />
      <main>
        <Hero />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
