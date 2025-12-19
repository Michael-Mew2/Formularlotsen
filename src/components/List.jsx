import React from "react";

export default function List({
  type,
  position,
  titleColor,
  title,
  listStyle,
  items,
}) {
  const listBoxRef = React.useRef(null);
  const listTitleRef = React.useRef(null);
  const listUlRef = React.useRef(null);

  React.useEffect(() => {
    const listBox = listBoxRef.current;
    const listTitle = listTitleRef.current;
    const listUl = listUlRef.current;

    if (!listBox || !listTitle || !listUl) return;

    // ResizeObserver überwacht Änderungen der Titel-Höhe
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const listTitleHeight = listTitle.offsetHeight;
        // console.log("ListtitleHeight (ResizeObserver):", listTitleHeight);

        if (listTitleHeight > 0) {
          listUl.style.marginTop = `${listTitleHeight / 2}px`;
          listBox.style.marginTop = `${listTitleHeight / 2}px`;
        }
      }
    }, 50); // 50ms Debounce

    observer.observe(listTitle);

    // Cleanup: Observer entfernen, wenn die Komponente unmountet
    return () => observer.disconnect();
  }, [items]);

  // Hilfsfunktion zur überprüfung ob Item ein Objekt mit subItem ist
  const isItemWithSubItems = (item) => {
    return typeof item === "object" && item !== null && "subItems" in item;
  };

  // Funktion zum Rendern eines Listeneintrags (mit oder ohne subItem)
  const renderListItem = (item, index) => {
    if (isItemWithSubItems(item)) {
      return (
        <li key={index}>
          <span>{item.text}</span>
          {item.subItems && item.subItems.length > 0 && (
            <ul class-name="sub-list">
              {item.subItems.map((subItem, subIndex) => (
                <li key={`${index}-${subIndex}`}>{subItem}</li>
              ))}
            </ul>
          )}
        </li>
      );
    } else {
      return <li key={index}>{item}</li>;
    }
  };

  return (
    <div
      ref={listBoxRef}
      className={`${type} ${position || "page-full"}`.trim()}
    >
      <div className="innerBox">
        <div
          ref={listTitleRef}
          className={`list-title ${titleColor || "yellow"}`.trim()}
        >
          <h4>{title}</h4>
        </div>
        <ul ref={listUlRef} className={`${listStyle || "lifeRing"}`.trim()}>
          {items.map((item, index) => renderListItem(item, index))}
        </ul>
      </div>
    </div>
  );
}
