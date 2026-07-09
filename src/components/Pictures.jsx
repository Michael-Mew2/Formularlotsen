import * as React from "react";

export default function Pictures({
  type,
  position,
  picture,
  alt,
  description,
  imageType,
}) {
  const imageRef = React.useRef(null);
  const descriptionRef = React.useRef(null);

  React.useEffect(() => {
    const figure = imageRef.current;
    const imageDescription = descriptionRef.current;

    if (figure && imageDescription) {
      const imageDescriptionHeight = imageDescription.offsetHeight;

      const additionalSpacing = 6;

      figure.style.marginBottom = `${
        imageDescriptionHeight / 2 + additionalSpacing
      }px`;
    }
  }, []);

  return (
    <figure
      ref={imageRef}
      className={`${type} ${position || "page-full"}`.trim()}
    >
      <img src={picture} alt={alt} className={imageType ? imageType : ""} />
      {description && description?.isArray ? (
        description.map((paragraph, index) => <p key={index}>{paragraph}</p>)
      ) : (
        <figcaption ref={descriptionRef}>{description}</figcaption>
      )}
    </figure>
  );
}
