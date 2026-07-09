import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Annotation({
  type,
  annotationStyle,
  annotationType,
  content,
}) {
  const annotationBoxRef = React.useRef(null);
  const annotationIconRef = React.useRef(null);
  const annotationContentRef = React.useRef(null);

  React.useEffect(() => {
    const annotationBox = annotationBoxRef.current;
    const annotationIcon = annotationIconRef.current;
    const annotationContent = annotationContentRef.current;

    if (annotationBox && annotationIcon && annotationContent) {
      const annotationIconHeight = annotationIcon.offsetHeight;

      const additionalSpacing = 0;
      const additionalBoxSpacing = 0;

      annotationContent.style.marginTop = `${
        annotationIconHeight / 3 + additionalSpacing
      }px`;
      annotationBox.style.marginTop = `${
        annotationIconHeight / 2 + additionalBoxSpacing
      }px`;
    }
  }, []);

  return (
    <div
      ref={annotationBoxRef}
      className={`${type} ${annotationStyle || "page-full"}`.trim()}
    >
      <div className="innerBox">
        <div
          ref={annotationIconRef}
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
        <div ref={annotationContentRef} className="annotationContent">
          {content?.isArray ? (
            content?.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
