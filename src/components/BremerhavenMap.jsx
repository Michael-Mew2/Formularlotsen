import * as React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLanguageStore } from "../store";

// ==========

// ==========

export default function BremerhavenMap() {
  // demo-center:
  const demoCenter = [];

  // demo-markers:
  const demoMarkers = [
    {
      geocode: [53.5431, 8.574446],
      popUp: "Ich bin das Klimahaus",
    },
    {
      geocode: [53.543455, 8.578937],
      popUp: "Ich bin die große Kirche",
    },
    {
      geocode: [53.585853, 8.609789],
      popUp: "Ich bin die neuste Sehenswürdigkeit!",
    },
  ];

  // custom icon:
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8771/8771504.png",
    iconSize: [38, 38], // Größe des Icons
  });

  // Cluster-Icon erstellen:
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    })
  }

  // ----------
  return (
    <div className="bremerhaven-map-container" style={{ height: "600px" }}>
      <MapContainer
        center={[53.5395845, 8.5729424]} // Zentrum der Stadt
        zoom={11}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading // Erlaubt es React alle Marker einzeln zu laden anstatt alle zusammen
          iconCreateFunction={createCustomClusterIcon}

        >
          {demoMarkers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
