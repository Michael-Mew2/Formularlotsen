import React from "react";

export default function Pictures({type, position, picture, alt, description}) {
  return (
    <figure
      className={`${type} ${position || "page-full"}`.trim()}
    >
      <img src={picture} alt={alt} />
      <figcaption>{description}</figcaption>
    </figure>
  );
}
