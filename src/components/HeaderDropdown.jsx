import * as React from "react";
import HeaderCard from "./HeaderCard";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BurgerMenuDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="burgerMenu__list-item__dropdown" ref={dropdownRef}>
      <motion.button
        aria-label="Knopf für Sprachen - Button for Languages"
        onClick={toggleDropdown}
        className="burgerMenu__list-item__link"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="burgerMenu__list-item__link__icon">
          <FontAwesomeIcon
            icon={
              isOpen ? "fa-regular fa-circle-xmark" : "fa-solid fa-language"
            }
          />
        </div>
        <p>Sprachen</p>
      </motion.button>
      <motion.div
        className="burgerMenu__list-item__dropdown-content"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, }}
        transition={{duration: 0.3, ease: "easeInOut"}}
      >
        <HeaderCard />
      </motion.div>
    </div>
  );
}

export default function HeaderDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="headerDropdown" ref={dropdownRef}>
      {/* Button bleibt fixiert */}
      <motion.button
        aria-label="Knopf für Sprachen - Button for Languages"
        onClick={toggleDropdown}
        className="headerCardToggleButton"
        animate={{
          borderRadius: isOpen ? "50px 50px 0 0" : "50px",
        }}
        whileHover={{ backgroundColor: "#F49C44" }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <FontAwesomeIcon
          icon={isOpen ? "fa-regular fa-circle-xmark" : "fa-solid fa-language"}
        />
        {!isOpen && <p>Sprachen</p>}
      </motion.button>

      {/* Content fixiert unter dem Button */}
      <motion.div
        className="headerCardContent"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <HeaderCard />
      </motion.div>
    </div>
  );
}
