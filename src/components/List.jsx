import React from "react";

export default function List({
  type,
  position,
  titleColor,
  title,
  listStyle,
  items,
}) {
  React.useEffect(() => {
    const listBox = document.querySelector(".list");
    const listTitle = document.querySelector(".list-title");
    const listUl = document.querySelector(".list ul");

    const listTitleHeight = listTitle.offsetHeight;
    console.log(listTitleHeight);

    const additionalContentSpacing = 0;
    const additionalBoxSpacing = 0;
    
    listUl.style.marginTop = `${listTitleHeight / 2 + additionalContentSpacing}px`;


    listBox.style.marginTop = `${listTitleHeight / 2 + additionalBoxSpacing}px`
  }, []);
  return (
    <div className={`${type} ${position || "page-full"}`.trim()}>
      <div className="innerBox">
        <div className={`list-title ${titleColor || "yellow"}`.trim()}>
          <h4>{title}</h4>
        </div>
        <ul className={`${listStyle || "lifeRing"}`.trim()}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
