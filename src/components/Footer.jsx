import React from "react";
import FooterNavigation from "./FooterNavigation";
import FooterExternal from "./FooterExternal";
import FooterPartner from "./FooterPartner";
import FooterCredits from "./FooterCredits";
import { useFooterLanguageStore, useLanguageStore } from '../store';

export default function Footer() {
  const {footerTexts, loadFooter} = useFooterLanguageStore();
  const {language} = useLanguageStore();

  React.useEffect(() => {
      loadFooter(language);
  }, [language]);

  return (
    <footer>
      <div className="seperation--orange" />
      <FooterNavigation footerTexts={footerTexts} />
      <FooterPartner footerTexts={footerTexts} />
      <FooterExternal footerTexts={footerTexts} />
      <FooterCredits footerTexts={footerTexts} />
      <div className="end" />
    </footer>
  );
}
