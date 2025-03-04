import React from "react";
import FooterNavigation from "./FooterNavigation";
import FooterExternal from "./FooterExternal";
import FooterPartner from "./FooterPartner";
import FooterCredits from "./FooterCredits";

export default function Footer() {
  return (
    <footer>
      <div className="seperation--orange" />
      <FooterNavigation />
      <FooterExternal />
      <FooterPartner />
      <FooterCredits />
    </footer>
  );
}
