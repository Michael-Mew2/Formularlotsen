import * as React from "react";

export default function FooterPartner({ footerTexts }) {
  return (
    <div className="footerPartner">
      <div className="sectionLeft">
        <h5>{footerTexts.footer?.externalPartner?.sponsor?.text}</h5>
        <div className="footerLogoContainer">
          {footerTexts.footer?.externalPartner?.sponsor?.organizations.map(
            (org, index) => (
              <a href={org.link} aria-label={org.aria} key={index} target="_blank">
                <img src={org.src} alt={org.alt} />
              </a>
            )
          )}
        </div>
      </div>
      <div className="sectionRight">
        <h5>{footerTexts.footer?.externalPartner?.partner?.text}</h5>
        <div className="footerLogoContainer">
          {footerTexts.footer?.externalPartner?.partner?.organizations.map(
            (org, index) => (
              <a href={org.link} aria-label={org.aria} key={index} target="_blank">
                <img src={org.src} alt={org.alt} />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
