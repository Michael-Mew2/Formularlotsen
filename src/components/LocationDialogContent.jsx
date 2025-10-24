import * as React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useLanguageStore } from "../store";

// Zur aktualisierung der Karte:
function MapUpdater({ center, offset }) {
  const map = useMap();

  React.useEffect(() => {
    if (center) {
      const offsetCenter = [center[0], center[1] + offset];
      map.setView(offsetCenter, map.getZoom());
    }
  }, [center, offset, map]);

  return null;
}

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

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8771/8771504.png",
    iconSize: [30, 30],
  });

  // Offset für die Karte (verschiebt den Marker nach rechts)
  const mapOffset = 0.0015; // Negativer Wert = nach links verschieben

  const handleOpenMap = () => {
    //Universaler Maps Link (Desktop & Mobile)
    const lat = location.pinPosition.lat;
    const lng = location.pinPosition.lng;
    const label = encodeURIComponent(location.location);

    // Öffnet Google Maps auf Desktop, Apple Maps auf iOS und Standart-App auf Android
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${label}`,
      "_blank"
    );
  }

  return (
    <div className="content-panel">
      {/* Standort-Name */}
      <div className="location-title-shell">
        <h5 className="location-title">{location.location}</h5>
      </div>

      {/* Inhalt  */}
      <div className="location-content">
        {/* Linke Seite */}
        <div className="left-side">

          {/* Karte mit Adresse */}
          <div className="map-container">
            <div
              className="map"
              style={{
                height: "100px",
                width: "100%",
              }}

              onClick={handleOpenMap}
            >
              <div className="map-overlay-container">
                 <i 
                  className="fa-solid fa-magnifying-glass-plus" 
                  style={{
                    color: "white",
                    fontSize: "32px",
                  }}
                ></i>
                <span
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "center",
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  }}
                >
                  In Karten-App öffnen
                </span>
              </div>
              <MapContainer
                key={`${location.pinPosition.lat}-${location.pinPosition.lng}`}
                style={{ height: "100%", width: "100%" }}
                center={[
                  location.pinPosition.lat,
                  location.pinPosition.lng + mapOffset,
                ]}
                zoom={15}
                maxZoom={15}
                minZoom={15}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                doubleClickZoom={false}
                touchZoom={false}
                boxZoom={false}
                keyboard={false}
                tap={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[
                    location.pinPosition.lat,
                    location.pinPosition.lng,
                  ]}
                  icon={customIcon}
                />

                <MapUpdater
                  center={[location.pinPosition.lat, location.pinPosition.lng]}
                  offset={mapOffset}
                />
              </MapContainer>
            </div>
            <div className="address">
              <p>{location.address.join(", ")}</p>
            </div>
          </div>

          {/* Beschreibung des Einganges */}
          <div className="entrance">
            <div className="entrance-picture">Bild</div>
            <div className="entrance-description">
              <p>Hier Text einfügen</p>
            </div>
          </div>

          {/* Beschreibung Anfahrt mit Bus */}
          {/*  <div className="transport-description">
            <p>
              {location.additionalInformation?.publicTransport?.content ||
                "Keine Informationen verfügbar"}
            </p>
          </div> */}
        </div>

        {/* Rechte Seite */}
        <div className="right-side">
          {/* Uhrzeiten */}
          <div className="times">
            {/* Zeitbereich: Entweder direkt aus location.timeRange oder aus schedule berechnen */}
            {location.timeRange ||
              location.schedule
                ?.map((scheduleItem) => getTimeRange(scheduleItem.timeId))
                .join(", ") ||
              "Keine Zeitangabe"}
          </div>

          {/* Inklusive Annehmlichkeiten */}
          <div className="inclusiveAmenities">
            Noch schauen wie ich das machen werde
          </div>

          {/* In Google/apple-Maps speichern */}
          <div className="open">Noch schauen wie ich das machen werde</div>
        </div>
      </div>
    </div>
  );
}
