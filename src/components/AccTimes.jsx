import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

export default function AccTimes({ openingTimes }) {
  const timeBoxRef = React.useRef(null);
  const timeIconRef = React.useRef(null);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const timeBox = timeBoxRef.current;
    const timeIcon = timeIconRef.current;
    const content = contentRef.current;

    if (timeBox && timeIcon && content) {
      const timeIconHeight = timeIcon.offsetHeight;

      const additionalSpacing = 0;
      const additionalBoxSpacing = 0;

      content.style.marginTop = `${timeIconHeight / 2 + additionalSpacing}px`;
      timeBox.style.marginTop = `${
        timeIconHeight / 2 + additionalBoxSpacing
      }px`;
    }
  }, []);

  return (
    <div className="times-outerBox" ref={timeBoxRef}>
      <div className="time-innerBox">
        <div className="time-iconBubble" ref={timeIconRef}>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
        </div>
        <div className="time-contentBox" ref={contentRef}>
          <div className="times-grid">
            {Object.entries(openingTimes).map(([day, time]) => (
              <div key={day} className="times-row">
                <div className="times-day">{day}</div>
                <div className="times-value">{time}</div>
                {/* Bitte mist CSS-Grid stylen!! */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
