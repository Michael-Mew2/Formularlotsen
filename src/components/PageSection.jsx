import * as React from "react";
import GridTable from "./GridTable";
import Annotation from "./Annotation";
import Pictures from "./Pictures";
import List from "./List";

export default function PageSection({ section }) {
  if (!section.visible && section.visible !== undefined) return null;

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
        <List type={section.type} position={section.position} titleColor={section.titleColor} title={section.title} listStyle={section.listStyle} items={section.items} />
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
