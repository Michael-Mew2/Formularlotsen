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
            to="/forms-info"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.formsInformation || "lädt..."}
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
          <NavLink
            to="aidOrganizations"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.aidOrganizations || "lädt..."}
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
            to="contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {navigationTexts.navigation?.contact || "lädt..."}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
