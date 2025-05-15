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
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLanguageStore } from "../store";

// Standard Marker-Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const standorte = [
  { name: "Standort A", coords: [53.5501, 8.5788], stadtteil: "Lehe" },
  { name: "Standort B", coords: [53.5411, 8.575], stadtteil: "Mitte" },
  // ... deine weiteren Standorte
];

export default function BremerhavenMap() {
  const [geoData, setGeoData] = React.useState(null);
  const [hoveredDistrict, setHoveredDistrict] = React.useState(null);

  React.useEffect(() => {
    const loadBoroughs = async () => {
      try {
        const response = await fetch("/data/Stadtteile_Bremerhaven.geojson");
        if (!response.ok)
          throw new Error(`HTTP_Map-Fehler: ${response.status}`);

        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error("Fehler beim Laden der Stadtteile:", error);
      }
    };
    loadBoroughs();
  }, []);

  const onEachFeature = (feature, layer) => {
    console.log("Feature:", feature.properties.BEZ_ST); // <- Zeigt dir, was im properties-Objekt steckt
    const name = feature.properties.BEZ_ST; // Passe ggf. den Property-Namen an

    layer.on({
      mouseover: () => {
        layer.setStyle({ color: "#ff7800", weight: 3, fillOpacity: 0.5 });
        setHoveredDistrict(name);
      },
      mouseout: () => {
        layer.setStyle({ color: "#3388ff", weight: 1, fillOpacity: 0.2 });
        setHoveredDistrict(null);
      },
      click: () => {
        layer.bindPopup(`<b>${name}</b>`).openPopup();
      },
    });

    layer.bindTooltip(name, { sticky: true });
  };

  const geoJsonStyle = { color: "#3388ff", weight: 1, fillOpacity: 0.2 };
  const center = [53.5396, 8.5809];
  // console.log(geoData);
  if (!geoData) return <p>Karte lädt…</p>;

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <GeoJSON
        data={geoData}
        style={geoJsonStyle}
        onEachFeature={onEachFeature}
      />

      {hoveredDistrict &&
        standorte
          .filter((s) => s.stadtteil === hoveredDistrict)
          .map((s, idx) => (
            <Marker key={idx} position={s.coords}>
              <Popup>{s.name}</Popup>
            </Marker>
          ))}
    </MapContainer>
  );
}
