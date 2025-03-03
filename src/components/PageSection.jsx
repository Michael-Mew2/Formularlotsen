import React from "react";

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
          className={`${section.type} ${section.style || "page-full"}`.trim()}
        >
          <h4>{section.title}</h4>
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
          className={`${section.type} ${section.style || "page-full"}`.trim()}
        >
          <h4>{section.title}</h4>
          <ul>
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "image":
      return (
        <figure
          className={`${section.type} ${section.style || "page-full"}`.trim()}
        >
          <img src={section.picture} alt={section.alt} />
          <figcaption>{section.description}</figcaption>
        </figure>
      );
    default:
      return null;
  }

}
