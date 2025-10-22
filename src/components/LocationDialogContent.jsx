import * as React from "react";

export default function LocationDialogContent({ location, getTimeRange }) {
  if (!location) {
    return (
      <div className="content-panel">
        <p>
          Hmm... ein Fehler ist aufgetreten. Es sind nämlich keine Standortdaten
          verfügbar!
        </p>
      </div>
    );
  }

  return (
    <div className="content-panel">
      {/* Standort-Name */}
      <h2 className="location-title">{location.location}</h2>

      {/* Adresse */}
      <div className="detail-item">
        <span className="detail-icon">📍</span>
        <div className="detail-content">
          <span className="detail-label">Adresse</span>
          <span className="detail-value">{location.address.join(", ")}</span>
        </div>
      </div>

      {/* Uhrzeit */}
      <div className="detail-item">
        <span className="detail-icon">🕒</span>
        <div className="detail-content">
          <span className="detail-label">Uhrzeit</span>
          <span className="detail-value">
            {/* Zeitbereich: Entweder direkt aus location.timeRange oder aus schedule berechnen */}
            {location.timeRange ||
              location.schedule
                ?.map((scheduleItem) => getTimeRange(scheduleItem.timeId))
                .join(", ") ||
              "Keine Zeitangabe"}
          </span>
        </div>
      </div>

      {/* Erreichbarkeit */}
      <div className="detail-item">
        <span className="detail-icon">🚌</span>
        <div className="detail-content">
          <span className="detail-label">Erreichbarkeit</span>
          <span className="detail-value">
            {location.additionalInformation?.publicTransport?.content ||
              "Keine Informationen verfügbar"}
          </span>
        </div>
      </div>
    </div>
  );
}
