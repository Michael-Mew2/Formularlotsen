import React from "react";

export default function Paragraph({
  type,
  position,
  title,
  titleColor,
  content,
  contentColor,
  subParagraphs,
  level = 0,
}) {
  // console.log(contentColor);

  const renderContent = (contentData, color) => {
    if (Array.isArray(contentData)) {
      return contentData.map((text, index) => (
        <p className={color} key={index}>
          {text}
        </p>
      ));
    }
    return contentData ? <p className={color}>{contentData}</p> : null;
  };

  // Dynamische Überschrift basierend auf Verscxhachtelungstiefe
  const HeadingTag = `h${Math.min(4 + level, 6)}`;

  return (
    <div
      className={`${level === 0 ? type : "sub-paragraph"} ${
        level === 0 ? position || "page-full" : ""
      }`.trim()}
    >
      {title && <HeadingTag className={titleColor}>{title}</HeadingTag>}
      {renderContent(content, contentColor)}

      {subParagraphs && subParagraphs.length > 0 && (
        <div className="sub-paragraphs">
          {subParagraphs.map((subPara, index) => (
            <Paragraph
              key={index}
              title={subPara.title}
              titleColor={subPara.titleColor || contentColor}
              content={subPara.content}
              contentColor={subPara.contentColor || contentColor}
              subParagraphs={subPara.subParagraphs}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
