import React from "react";

export default function Paragraph({type, position, title, titleColor, content, contentColor}) {
  // console.log(contentColor);
  
  return (
    <div
      className={`${type} ${position || "page-full"}`.trim()}
    >
      {title && <h4 className={titleColor}>{title}</h4>}
      {Array.isArray(content) ? (
        content.map((text, index) => <p className={contentColor} key={index}>{text}</p>)
      ) : (
        <p className={contentColor}>{content}</p>
      )}
    </div>
  );
}
