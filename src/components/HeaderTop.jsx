import * as React from "react";
import { motion } from "framer-motion";

import HeaderLogo from "./HeaderLogo";
import HeaderCard from "./HeaderCard";
import HeaderDropdown from "./HeaderDropdown";
import BurgerMenu from "./BurgerMenu";

const HeaderTop = React.forwardRef(({ isScrolled }, ref) => {
  const [isMobile,setIsMobile] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize =() => {
      setIsMobile(window.innerWidth <= 700);;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div ref={ref} className={`header--top ${isScrolled ? "scrolled" : ""}`}>
      <div className="headerContentTop">
        <HeaderLogo />
        {isMobile ? (
          <BurgerMenu isOpen={isBurgerOpen} toggleMenu={toggleBurgerMenu} />
        ) : (
          <HeaderDropdown />
        )}
      </div>
    </div>
  );
});

export default HeaderTop;
