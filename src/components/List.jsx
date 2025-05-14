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

    if (listBox && listTitle && listUl) {
      const listTitleHeight = listTitle.offsetHeight;
      // console.log(listTitleHeight);

      const additionalContentSpacing = 0;
      const additionalBoxSpacing = 0;

      listUl.style.marginTop = `${
        listTitleHeight / 2 + additionalContentSpacing
      }px`;
      listBox.style.marginTop = `${
        listTitleHeight / 2 + additionalBoxSpacing
      }px`;
    }
  }, []);

  return (
    <div ref={listBoxRef} className={`${type} ${position || "page-full"}`.trim()}>
      <div className="innerBox">
        <div ref={listTitleRef} className={`list-title ${titleColor || "yellow"}`.trim()}>
          <h4>{title}</h4>
        </div>
        <ul ref={listUlRef} className={`${listStyle || "lifeRing"}`.trim()}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
