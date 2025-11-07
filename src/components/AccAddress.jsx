import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AccAddress({ content }) {
  console.log("Address:", content);

  const addressBoxRef = React.useRef(null);
  const mapIconRef = React.useRef(null);
  const contentRef = React.useRef(null);

  React.useEffect (() =>{
    const addressBox = addressBoxRef.current;
    const mapIcon = mapIconRef.current;
    const content = contentRef.current;

    if (addressBox && mapIcon && content) {
      const mapIconHeight = mapIcon.offsetHeight;

      const additionalSpacing = 0;
      const additionalBoxSpacing = 0;

      content.style.marginTop = `${
        mapIconHeight / 2 + additionalSpacing
      }px`;
      addressBox.style.marginTop = `${
        mapIconHeight / 2 + additionalBoxSpacing
      }px`;
    }
  }, []);

  return (
    <div ref={addressBoxRef} className="address-outerBox">
      <div className="address-innerBox">
        <div className="address-iconBubble" ref={mapIconRef}>
          <FontAwesomeIcon icon="fa-solid fa-map-location-dot" />
        </div>
        <div className="address-contentBox" ref={contentRef}>
          {content.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
