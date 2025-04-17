import * as React from "react";

export default function Pictures({type, position, picture, alt, description}) {

    React.useEffect(() => {
        const figure = document.querySelector(".image");
        const imageDescription = document.querySelector("figcaption");

        const imageDescriptionHeight = imageDescription.offsetHeight;

        const additionalSpacing = 6
        figure.style.marginBottom = `${imageDescriptionHeight / 2 + additionalSpacing}px`
    })

  return (
    <figure
      className={`${type} ${position || "page-full"}`.trim()}
    >
      <img src={picture} alt={alt} />
      <figcaption>{description}</figcaption>
    </figure>
  );
}
