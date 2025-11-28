import * as React from "react";

export default function FooterCredits({ footerTexts }) {
  const recreationText = footerTexts.footer?.credits?.recreation?.text;
  const recreationLink = footerTexts.footer?.credits?.recreation?.link;

  return (
    <div className="footerCredits">
      <div className="upperBlock">
        <p>
          Made with <i className='fa-solid fa-heart'></i> in Bremerhaven by <a href="https://github.com/Michael-Mew2" rel="noopener noreferrer" target="_blank">Michael</a>
        </p>
      </div>
      <div className="specialThanks">
        <p>{footerTexts.footer?.credits?.original?.text}</p>
      </div>
    </div>
  );
}
