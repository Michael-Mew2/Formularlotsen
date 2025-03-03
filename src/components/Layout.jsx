import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Hero from "./Hero";

export default function Layout() {
  return (
    <>
      {/* 👾 Metadata: */}
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://use.typekit.net/ran2vxb.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

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
