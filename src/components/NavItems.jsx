import * as React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useLanguageStore, useNavigationLanguageStore } from "../store";

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

export default function NavItems({ isMobile = false }) {
  const { navigationTexts, loadNavigation } = useNavigationLanguageStore();
  const { language } = useLanguageStore();

  React.useEffect(() => {
    loadNavigation(language);
  }, [language]);

  return (
    <div
      style={isMobile ? { listStyle: "none", padding: 0, margin: 0 } : {}}
    >
      {[
        { to: "/", text: navigationTexts.navigation?.home },
        {
          to: "/formsInformation",
          text: navigationTexts.navigation?.formsInformation,
        },
        {
          to: "timeAndLocation",
          text: navigationTexts.navigation?.timeAndLocation,
        },
        {
          to: "aidOrganizations",
          text: navigationTexts.navigation?.aidOrganizations,
        },
        { to: "join", text: navigationTexts.navigation?.joinUs },
        { to: "contact", text: navigationTexts.navigation?.contact },
      ].map((item, i) => (
        <motion.li
          key={i}
          className={isMobile ? "burgerMenu__list-item" : {}}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
            <div className="burgerMenu__list-item__icon" />
          <NavLink
            to={item.to}
            className="burgerMenu__list-item__link"
          >
            {item.text || "lädt..."}
          </NavLink>
        </motion.li>
      ))}
    </div>
  );
}
