import * as React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguageStore, useNavigationLanguageStore } from "../store";
import { BurgerMenuDropdown } from "./HeaderDropdown";

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

export default function NavItems({ isMobile = false, toggleMenu }) {
  const { navigationTexts, loadNavigation } = useNavigationLanguageStore();
  const { language } = useLanguageStore();

  React.useEffect(() => {
    loadNavigation(language);
  }, [language]);

  const menuItems = [
    { to: "/", text: navigationTexts.navigation?.home, icon: "house" },
    {
      to: "/forms-info",
      text: navigationTexts.navigation?.formsInformation,
      icon: "info",
    },
    {
      to: "timeAndLocation",
      text: navigationTexts.navigation?.timeAndLocation,
      icon: "location-pin",
    },
    {
      to: "aidOrganizations",
      text: navigationTexts.navigation?.aidOrganizations,
      icon: "hand-holding-heart",
    },
    { to: "join", text: navigationTexts.navigation?.joinUs, icon: "handshake" },
    {
      to: "contact",
      text: navigationTexts.navigation?.contact,
      icon: "envelope",
    },
  ];

  if (isMobile) {
    menuItems.push({ type: "dropdown", icon: "language" });
  }

  const handleNavLinkClick = () => {
    if (isMobile) {
      toggleMenu();
    }
  };

  return (
    <div style={isMobile ? { listStyle: "none", padding: 0, margin: 0 } : {}}>
      {menuItems.map((item, i) => (
        <motion.li
          key={i}
          className={isMobile ? "burgerMenu__list-item" : ""}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.type === "dropdown" ? (
            <BurgerMenuDropdown />
          ) : (
            <NavLink to={item.to} className="burgerMenu__list-item__link" onClick={handleNavLinkClick}>
              {item.icon && (
                <div className="burgerMenu__list-item__link__icon">
                  <FontAwesomeIcon icon={["fas", item.icon]} />
                </div>
              )}
              <p>{item.text || "lädt..."}</p>
            </NavLink>
          )}
        </motion.li>
      ))}
    </div>
  );
}
