import React from "react";

export default function ContactInfo({ section }) {
  console.log("Contact-info-section-content:", section);

  return (
    <div className="contact-info-container">
      <h3 className="contact-info-title">{section}</h3>
      <p className="contact-info-content">{section}</p>
    </div>
  )
}
