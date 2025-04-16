import * as React from "react";
import GridTable from "./GridTable";
import Annotation from "./Annotation";
import Pictures from "./Pictures";

export default function PageSection({ section }) {
  if (!section.visible && section.visible !== undefined) return null;

  React.useEffect(() => {
    const listTitle = document.querySelector(".list-title");
    const listUl = document.querySelector(".list ul");

    const listTitleHeight = listTitle.offsetHeight;
    console.log(listTitleHeight);
    
    const additionalSpacing = 0;
    listUl.style.marginTop = `${listTitleHeight / 2 + additionalSpacing}px`
  }, [])

  switch (section.type) {
    case "intro":
      return (
        <div className={section.type || "intro"}>
          <h3>{section.title}</h3>
          <p>{section.content}</p>
        </div>
      );

    case "paragraph":
      return (
        <div
          className={`${section.type} ${section.position || "page-full"}`.trim()}
        >
          {section.title && <h4>{section.title}</h4>}
          {Array.isArray(section.content) ? (
            section.content.map((text, index) => <p key={index}>{text}</p>)
          ) : (
            <p>{section.content}</p>
          )}
        </div>
      );

    case "list":
      return (
        <div
          className={`${section.type} ${section.position || "page-full"}`.trim()}
        >
          <div className={`list-title ${section.titleColor || "yellow"}`.trim()}>
            <h4>{section.title}</h4>
          </div>
          <ul className={`${section.listStyle || "lifeRing"}`.trim()}>
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "annotation":
      return (
        <Annotation type={section.type} annotationStyle={section.position} annotationType={section.annotationType} content={section.content} />
      );

    case "image":
      return (
       <Pictures type={section.type} position={section.position} picture={section.picture} alt={section.alt} description={section.description} />
      );

    case "table":
      return <GridTable data={section.data} title={section.title} />;
    default:
      return null;
  }
}
