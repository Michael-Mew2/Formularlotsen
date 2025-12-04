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

    if (!timeBox || !timeIcon || !content) return;

    // ResizeObserver überwacht Änderungen der Titel-Höhe
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const timeIconHeight = timeIcon.offsetHeight;
        // console.error("timeIconHeight (ResizeObserver):", timeIconHeight);

        if (timeIconHeight > 0) {
          content.style.marginTop = `${timeIconHeight / 4}px`;
          timeBox.style.marginTop = `${timeIconHeight / 2}px`;
        }
      }
    }, 50); // 50ms Debounce

    observer.observe(timeIcon);

    // Cleanup: Observer entfernen, wenn die Komponente unmountet
    return () => observer.disconnect();
  }, [openingTimes]);

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
