import React from "react";

export default function FooterCredits({ footerTexts }) {
  return (
    <div className="footerCredits">
      <div className="upperBlock">
        <p>{footerTexts.footer?.credits?.recreation?.text}</p>
      </div>
      <div className="specialThanks">
        <p>{footerTexts.footer?.credits?.original?.text}</p>
      </div>
    </div>
  );
}
