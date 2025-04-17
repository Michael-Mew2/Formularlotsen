import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Annotation({
  type,
  annotationStyle,
  annotationType,
  content,
}) {
  React.useEffect(() => {
    const annotationBox = document.querySelector(".annotation");
    const annotationIcon = document.querySelector(".annotationBubble");
    const annotationContent = document.querySelector(".annotationContent");

    const annotationIconHeight = annotationIcon.offsetHeight;

    const additionalSpacing = 0;
    const additionalBoxSpacing = 0;
    annotationContent.style.marginTop = `${
      annotationIconHeight / 3 + additionalSpacing
    }px`;
    annotationBox.style.marginTop = `${annotationIconHeight / 2 + additionalBoxSpacing}px`;
  }, []);

  return (
    <div className={`${type} ${annotationStyle || "page-full"}`.trim()}>
      <div className="innerBox">
        <div
          className={`annotationBubble ${
            annotationType || "information"
          }`.trim()}
        >
          {(() => {
            switch (annotationType) {
              case "information":
                return <FontAwesomeIcon icon="fa-solid fa-circle-info" />;

              case "question":
                return <FontAwesomeIcon icon="fa-solid fa-circle-question" />;

              case "warning":
                return (
                  <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                );

              default:
                return <FontAwesomeIcon icon="fa-solid fa-circle-info" />;
            }
          })()}
        </div>
        <div className="annotationContent">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
