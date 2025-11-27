import * as React from "react";
import { motion } from "framer-motion";
import NavItems from "./NavItems";

export default function BurgerMenu({ isOpen, toggleMenu }) {
  const [xPosition, setXPosition] = React.useState("calc(100% - 50px)");

  React.useEffect(() => {
    const updateXPosition = () => {
      const isRTL =
        typeof window !== "undefined" && document.documentElement.dir === "rtl";
      setXPosition(isRTL ? "50px" : "calc(100% - 50px)");
    };

    updateXPosition();

    // Event-Listener für Änderungen der Textrichtung
    const observer = new MutationObserver(updateXPosition);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    // Cleanup-Funktion
    return () => {
      observer.disconnect();
    };
  }, []);

  // Variants für die Seitenleiste (Kreis-Animation)
  const sidebarVariants = {
    open: (height = 1000) => {
      return {
        clipPath: `circle(${height * 2 + 200}px at ${xPosition} 50px)`,
        transition: {
          type: "spring",
          stiffness: 20,
          restDelta: 2,
        },
      };
    },
    closed: {
      clipPath: `circle(20px at ${xPosition} 50px)`,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <div className="burgerMenu">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="burgerMenu__nav"
      >
        <motion.div
          className={`burgerMenu__background ${isOpen ? "open" : ""}`}
          variants={sidebarVariants}
        />
        <motion.ul className={`burgerMenu__list ${isOpen ? "open" : ""}`} variants={navVariants}>
          <NavItems isMobile={true} />
        </motion.ul>
        <MenuToggle toggle={toggleMenu} />
      </motion.nav>
    </div>
  );
}

// ----------

// ----------

// Variants für die Navigation (gestaffelte Animation der Menüpunkte)
const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Variants für die einzelnen Menüpunkte
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// ----------

// MenuToggle-Komponente (Burger-Button mit Animation)
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button onClick={toggle} className="burgerMenu__toggleButton">
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      style={{ display: "block", margin: "0 auto" }}
    >
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

// ----------
