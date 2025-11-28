import * as React from "react";
import HeaderCard from "./HeaderCard";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { code } from "framer-motion/client";

export function BurgerMenuDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = React.useState(0);
  const dropdownRef = React.useRef(null);

  const languages = [
    { name: "Deutsch", code: "de", word: "Sprachen" },
    { name: "English", code: "en", word: "Languages" },
    { name: "العربية", code: "ar", word: "اللغات" },
    { name: "فarsi", code: "fa", word: "زبان ها" },
    { name: "Türkçe", code: "tr", word: "Diller" },
    { name: "български", code: "bg", word: "Ези" },
    { name: "Українська", code: "uk", word: "Мови" },
    { name: "polski", code: "pl", word: "Jezyki" },
    { name: "Português", code: "pt", word: "Idiomas" },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % languages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const textVariants = {
    enter: { opacity: 0, x: 10 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="burgerMenu__list-item__dropdown" ref={dropdownRef}>
      <motion.button
        aria-label="Knopf für Sprachen - Button for Languages"
        onClick={toggleDropdown}
        className={`burgerMenu__list-item__link ${isOpen ? "open" : ""}`}
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
        <div className="language-text-container">
          <AnimatePresence mode="sync">
            <motion.p
              key={currentLanguageIndex}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {languages[currentLanguageIndex].word}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.button>
      <motion.div
        className="burgerMenu__list-item__dropdown-content"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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
