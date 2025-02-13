import * as React from "react";
import LanguageSelector from "./LanguageSelector";
import HeaderLogo from "./HeaderLogo";

const HeaderTop = React.forwardRef(({ isScrolled }, ref) => {
  return (
    <div ref={ref} className={`header--top ${isScrolled ? "scrolled" : ""}`}>
      <HeaderLogo />
      <LanguageSelector />
    </div>
  );
});

export default HeaderTop;
