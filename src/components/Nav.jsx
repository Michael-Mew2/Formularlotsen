import * as React from "react";
import { NavLink } from "react-router-dom";
import { useNavigationLanguageStore, useLanguageStore } from "../store";

export default function Nav() {
  const { navigationTexts, loadNavigation } = useNavigationLanguageStore();
  const { language } = useLanguageStore(); // Aktuelle Sprache holen

  React.useEffect(() => {
    loadNavigation(language); // Navigationstexte immer aktualisieren
  }, [language]);

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.home || "lädt..."}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="join"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.joinUs || "lädt..."}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="timeAndLocation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.timeAndLocation || "lädt..."}
          </NavLink>
        </li>
        <li>
          <a href="/">hier</a>
        </li>
        <li>
          <a href="/">hier</a>
        </li>
        <li>
          <a href="/">hier</a>
        </li>
      </ul>
    </nav>
  );
}
