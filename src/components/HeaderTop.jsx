import * as React from "react";
import { motion } from "framer-motion";

import HeaderLogo from "./HeaderLogo";
import HeaderCard from "./HeaderCard";
import HeaderDropdown from "./HeaderDropdown";

const HeaderTop = React.forwardRef(({ isScrolled }, ref) => {

  return (
    <div ref={ref} className={`header--top ${isScrolled ? "scrolled" : ""}`}>
      <div className="headerContentTop">
        <HeaderLogo />
        <HeaderDropdown />
      </div>
    </div>
  );
});

export default HeaderTop;
