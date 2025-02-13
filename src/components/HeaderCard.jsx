import * as React from "react";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";

export default function HeaderCard({ isOpen }) {
  return (
    <motion.div
      initial={{ y:"-100%", opacity: 0 }}
      animate={{ y: isOpen ? 0 : "-100%", opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="headerCard"
    >
      <LanguageSelector />
    </motion.div>
  );
}
