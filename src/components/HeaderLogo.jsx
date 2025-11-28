import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderLogo() {
  const [isDisplaySmall, setIsDisplaySmall] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDisplaySmall(window.innerWidth <= 445);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="headerLogo">
      <NavLink to="/" className="headerLogoHitBox">
        
          <img
            src="./images/logos/FORMULARLOTSEN_Logo-solo.svg"
            alt="Logo Bremerhavener Formularlotsen"
          />
        
        {!isDisplaySmall && (
          <p className="headerLogoName">
            <span className="headerLogoCity">Bremerhavener</span>
            <br />
            <span className="headerLogoBrand">
              Formularl<b>o</b>tsen
            </span>
          </p>
        )}
      </NavLink>
    </div>
  );
}
