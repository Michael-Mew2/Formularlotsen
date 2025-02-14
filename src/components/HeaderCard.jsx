import * as React from "react";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";

export default function HeaderCard({ isOpen }) {
  return (
    <motion.div className="headerCard">
      <LanguageSelector />
    </motion.div>
  );
}
