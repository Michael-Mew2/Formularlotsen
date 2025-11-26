import * as React from "react";
import { motion } from "framer-motion";
import HeaderCard from "./HeaderCard";
import NavItems from "./NavItems";

const burgerVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    y: 20,
    opacity: 0,
  },
};

export default function BurgerMenu({ isOpen, toggleMenu }) {
  return (
    <motion.div
      className="burgerMenu"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={burgerVariants}
    >
      <motion.button
        onClick={toggleMenu}
        className="burgerButton"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>
      <motion.div
        className="burgerContent"
        variants={itemVariants}
      >
        <NavItems isMobile={true} />
      </motion.div>
    </motion.div>
  );
}
