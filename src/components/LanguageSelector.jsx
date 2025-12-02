import * as React from "react";
import { useLanguageStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { setLanguage } = useLanguageStore();
  const [currentArabicFlagIndex, setCurrentArabicFlagIndex] = React.useState(0);
  const [currentPersianFlagIndex, setCurrentPersianFlagIndex] =
    React.useState(0);

  // Liste der arabischen Länderflaggen
  const arabicFlags = [
    { country: "sa", name: "Saudi-Arabien" },
    { country: "eg", name: "Ägypten" },
    { country: "ma", name: "Marokko" },
    { country: "ae", name: "Vereinigte Arabische Emirate" },
    { country: "jo", name: "Jordanien" },
    { country: "lb", name: "Libanon" },
    { country: "al", name: "Algerien" },
  ];

  // Liste der persischen Länderflaggen
  const persianFlags = [
    { country: "af", name: "Afghanistan" },
    { country: "ira", name: "Iran" },
    { country: "td", name: "Tadschikistan" },
  ];

  const portugueseFlags = [
    { country: "pt", name: "Portugal" },
    { country: "br", name: "Brasil" },
    { country: "ao", name: "Angola" },
    { country: "mz", name: "Mozambique" },
  ];

  // Wechsle die Flagge alle 3 Sekunden
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArabicFlagIndex(
        (prevIndex) => (prevIndex + 1) % arabicFlags.length
      );
      setCurrentPersianFlagIndex(
        (prevIndex) => (prevIndex + 1) % persianFlags.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const flagVariants = {
    enter: { opacity: 0, x: 10 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="languageContent">
      <button onClick={() => setLanguage("de")}>
        <img src="./images/flags/de.svg" alt="deutsche Flagge" /> Deutsch
      </button>
      <button onClick={() => setLanguage("en")}>
        <img src="./images/flags/en.svg" alt="english flag" /> English
      </button>

      <button
        onClick={() => setLanguage("ar")}
        className="flag-carousel-container"
      >
        <div className="flag-container">
          <AnimatePresence mode="sync">
            <motion.img
              key={arabicFlags[currentArabicFlagIndex].country}
              src={`./images/flags/ar/${arabicFlags[currentArabicFlagIndex].country}.svg`}
              alt={`Flagge von ${arabicFlags[currentArabicFlagIndex].name}`}
              variants={flagVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        العربية
      </button>

      <button
        onClick={() => setLanguage("fa")}
        className="flag-carousel-container"
      >
        <div className="flag-container">
          <AnimatePresence mode="sync">
            <motion.img
              key={persianFlags[currentPersianFlagIndex].country}
              src={`./images/flags/fa/${persianFlags[currentPersianFlagIndex].country}.svg`}
              alt={`Flagge von ${persianFlags[currentPersianFlagIndex].name}`}
              variants={flagVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        فارسی
      </button>
      <button onClick={() => setLanguage("tr")}>
        <img src="./images/flags/tr.svg" alt="Türkische Flagge" /> Türkçe
      </button>
      <button onClick={() => setLanguage("bg")}>
        <img src="./images/flags/bg.svg" alt="Bulgarsische Flagge" /> български
      </button>
      <button onClick={() => setLanguage("uk")}>
        <img src="./images/flags/uk.svg" alt="Ukrainische Flagge" /> Українська
      </button>
      <button onClick={() => setLanguage("pl")}>
        <img src="./images/flags/pol.svg" alt="Polnische Flagge" /> polski
      </button>

      <button
        onClick={() => setLanguage("pt")}
        className="flag-carousel-container"
      >
        <div className="flag-container">
          <AnimatePresence mode="sync">
            <motion.img
              key={portugueseFlags[currentPersianFlagIndex].country}
              src={`./images/flags/pt/${portugueseFlags[currentPersianFlagIndex].country}.svg`}
              alt={`Flagge von ${portugueseFlags[currentPersianFlagIndex].name}`}
              variants={flagVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        Portugês
      </button>
    </div>
  );
}
