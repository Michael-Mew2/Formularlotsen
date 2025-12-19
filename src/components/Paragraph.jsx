import React from "react";

export default function Paragraph({
  type,
  position,
  title,
  titleColor,
  content,
  contentColor,
  subParagraphs,
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

  return (
    <div className={`${type} ${position || "page-full"}`.trim()}>
      {title && <h4 className={titleColor}>{title}</h4>}
      {renderContent(content, contentColor)}

      {subParagraphs && subParagraphs.length > 0 && (
        <div className="sub-paragraphs">
          {subParagraphs.map((subPara, index) => (
            <div key={index} className="sub-paragraph">
              {subPara.title && (
                <h5 className={subPara.titleColor || contentColor}>
                  {subPara.title}
                </h5>
              )}
              {renderContent(
                subPara.content,
                subPara.contentColor || contentColor
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
