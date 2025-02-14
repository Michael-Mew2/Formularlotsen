import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <div className="headerLogo">
      <NavLink to="/" className="headerLogoHitBox">
        <img
          src="./images/logos/FORMULARLOTSEN_Logo-solo.svg"
          alt="Logo Bremerhavener Formularlotsen"
        />
        <p className="headerLogoName">
          <span className="headerLogoCity">Bremerhavener</span>
          <br />
          <span className="headerLogoBrand">
            Formularl<b>o</b>tsen
          </span>
        </p>
      </NavLink>
    </div>
  );
}
