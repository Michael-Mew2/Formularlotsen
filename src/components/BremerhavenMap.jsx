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
  const [locationData, setLocationData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { language } = useLanguageStore();

  React.useEffect(() => {
    const loadLocationInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `texte/locales/components/locationData/${language}.json`
        );
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

        const data = await response.json();
        console.log("Daten erfolgreich geladen:", data);

        setLocationData(data.locationData.data.locations);
      } catch (error) {
        console.error(`Fehler beim laden der Datei: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationInfo();
  }, [language]);

  React.useEffect(() => {
    if (locationData === null) {
      console.log("locationData noch null");
    } else {
      console.log("LocationData:", locationData);
    }
  }, [locationData]);
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
      iconSize: point(33, 33, true),
    });
  };

  // ----------
  return (
    <div className="bremerhaven-map-container" style={{ height: "600px" }}>
      {isLoading ? (
        <div className="map-loading">Map is loading...</div>
      ) : (
        <MapContainer
          center={[53.5395845, 8.5729424]} // Zentrum der Stadt
          zoom={11}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


            {locationData?.map((marker, index) => (
              <Marker
                key={`marker-${index}`}
                position={[marker.pinPosition.lat, marker.pinPosition.lng]}
                icon={customIcon}
              >
                <Popup>{marker.location}</Popup>
              </Marker>
            ))}

        </MapContainer>
      )}
    </div>
  );
}
