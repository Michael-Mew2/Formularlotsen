import * as React from "react";
import { motion } from "framer-motion";

import HeaderLogo from "./HeaderLogo";
import HeaderCard from "./HeaderCard";

const HeaderTop = React.forwardRef(({ isScrolled }, ref) => {
  const [isCardOpen, setIsCardOpen] = React.useState(false);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div ref={ref} className={`header--top ${isScrolled ? "scrolled" : ""}`}>
      <div className="headerContentTop">
        <HeaderLogo />
        <motion.button
           whileHover={{ color: "#006176", fontWeight:800 }}
           whileTap={{ scale: 0.9 }}
           onClick={toggleCard}
           className="headerCardToggleButton"
           initial={{ height: "auto" }}
           animate={{ height: isCardOpen ? "100vh" : "auto" }}
           transition={{ duration: 0.3 }}
        >
          Language
        </motion.button>
      </div>
      <HeaderCard isOpen={isCardOpen} />
    </div>
  );
});

export default HeaderTop;
