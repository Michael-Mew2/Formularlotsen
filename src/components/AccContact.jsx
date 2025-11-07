import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "leaflet";
import * as React from "react";

export default function AccContact({ contactData }) {
  const getContactType = (value) => {
    if (!value) return { icon: null, action: null };

    // E-Mail erkennen:
    if (value.includes("@")) {
      return { icon: "fa-solid fa-envelope", action: "mailto", type: "email" };
    }
    // WhatsApp erkennen:
    else if (
      value.startsWith("whatsapp:") ||
      value.startsWith("https://wa.me/")
    ) {
      return {
        icon: "fa-brands fa-whatsapp",
        action: "url",
        type: "whatsapp",
      };
    }
    // Webseite erkennen:
    else if (
      (!value.startsWith("https://wa.me/") && value.startsWith("http")) ||
      value.startsWith("www.") ||
      value.startsWith("https") ||
      (value.includes(".") && !value.includes(" "))
    ) {
      return { icon: "fa-solid fa-globe", action: "url", type: "website" };
    }

    // Telefonnummer erkennen:
    else if (/^[\d\s\+\(\-\)\/]+$/.test(value)) {
      return { icon: "fa-solid fa-phone", action: "tel", type: "phone" };
    }

    // Adresse erkennen:
    else if (value.includes(",") || /\d{5}/.test(value)) {
      return { icon: "fa-solid fa-pin", action: "map", type: "address" };
    }

    // Standard:
    else {
      return { icon: null, action: null, type: null };
    }
  };

  // Aktionen ausführen:
  const handleAction = (action, value) => {
    switch (action) {
      case "mailto":
        window.location.href = `mailto:${value}`;
        break;
      case "url":
        window.open(
          value.startsWith("http") ? value : `https://${value}`,
          "_blank"
        );
        break;
      case "tel":
        window.location.href = `tel:${value.replace(/\s+/g, "")}`;
        break;
      case "map":
        window.open(
          `https://www.google.com/maps/search/${encodeURIComponent(value)}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="contact-outerBox">
      <div className="contact-innerBox">
        <div className="contact-iconBubble">
          <FontAwesomeIcon icon="fa-solid fa-message" />
        </div>
        <div className="contact-contentBox">
          <ul className="contact-list">
            {Object.entries(contactData).map(([label, value]) => {
              const { icon, action, type } = getContactType(value);

              return (
                <li className="contact-item" key={label}>
                  <div className="contact-entry">
                    {icon && (
                      <button
                        className="contact-button"
                        aria-label={label}
                        onClick={() => action && handleAction(action, value)}
                      >
                        <span className="contact-icon">
                          <FontAwesomeIcon icon={icon} />
                        </span>
                        <span className="contact-type">{label}</span>
                        <span className="contact-value">{value}</span>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
