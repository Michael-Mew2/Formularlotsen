import * as React from "react";
import GridTable from "./GridTable";
import Annotation from "./Annotation";
import Pictures from "./Pictures";
import List from "./List";
import Paragraph from "./Paragraph";
import PageContent from "./PageContent";

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
       <Paragraph type={section.type} position={section.position} title={section.title} content={section.content} titleColor={section.titleColor} contentColor={section.contentColor} />
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

    case "interactiveMapBoroughs":
      return <p>Hello</p>

    default:
      return null;
  }
}
