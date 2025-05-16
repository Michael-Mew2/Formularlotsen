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

// ==========

// Standard Marker-Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ==========

export default function BremerhavenMap() {
  const [geoData, setGeoData] = React.useState(null);
  const [locations, setLocations] = React.useState([]);
  const [hoveredDistrict, setHoveredDistrict] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { language } = useLanguageStore();

  React.useEffect(() => {
    const loadMapData = async () => {
      try {
        setIsLoading(true);

        // GeoJSON laden:
        const geoResponse = await fetch(
          "/data/Stadtteile_Bremerhaven-wgs84.geojson"
        );
        if (!geoResponse.ok) {
          throw new Error(`GeoJSON-Fehler: ${geoResponse.status}`);
        }

        const geoJsonData = await geoResponse.json();

        const locationsResponse = await fetch(
          `texte/locales/components/locationData/${language}.json`
        );
        if (!locationsResponse.ok) {
          throw new Error(`Standorte-Fehler: ${locationsResponse.status}`);
        }

        const locationsData = await locationsResponse.json();

        // Validierung der Daten
        if (!locationsData?.locationData?.data?.locations) {
          throw new Error("Ungültiges Location-Datenformat");
        }

        const formattedLocations =
          locationsData.locationData.data.locations.map((location) => ({
            name: location.location,
            coords: [location.pinPosition.lat, location.pinPosition.lng],
            stadtteil: location.borough,
            beschreibung: `${location.address.join(", ")}`,
            additionalInfo: location.additionalInformation,
          }));

        // Beide States in einem einzigen State-Update setzen
        setGeoData(geoJsonData);
        setLocations(formattedLocations);

        console.log("Formatierte Locations:", formattedLocations);
      } catch (error) {
        console.error("Fehler beim Laden der Map-Daten:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadMapData();
  }, []);

  React.useEffect(() => {
    console.log("GeoData nach Set:", geoData);
    console.log("Locations nach Set:", locations);
  }, [geoData, locations]);

  // Style für Stadtteil-Layer
  const getGeoJsonStyle = (feature) => {
    const districtName = feature.properties.BEZ_ST;
    const isHovered = districtName === hoveredDistrict;

    return {
      color: isHovered ? "#ff7800" : "#3388ff",
      weight: isHovered ? 3 : 1,
      fillOpacity: isHovered ? 0.5 : 0.2,
      className: `stadtteil ${isHovered ? "hovered" : ""}`,
    };
  };

  // Event-Handler für Stadtteil-Layer
  const onEachFeature = (feature, layer) => {
    const name = feature.properties.BEZ_ST;

    layer.options.className = "stadtteil";

    layer.on({
      mouseover: () => {
        setHoveredDistrict(name);
      },
      mouseout: () => {
        setHoveredDistrict(null);
      },
      click: () => {
        layer.bindPopup(`<b>${name}</b>`).openPopup();
      },
    });

    layer.bindTooltip(name, { sticky: true });
  };

  if (isLoading) return <div className="map-loading">Karte lädt...</div>;
  if (error) return <div className="map-error">Fehler: {error}</div>;
  if (!geoData) {
    return <div className="map-error">Keine Geodaten verfügbar</div>;
  }

  // Bremerhaven Stadtzentrum als Kartenmittelpunkt
  const center = [53.5396, 8.5809];

  // ----------

  return (
    <div className="bremerhaven-map-container">
      <MapContainer
        center={center}
        zoom={12}
        className="map"
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {geoData && (
          <GeoJSON
            key={hoveredDistrict}
            data={geoData}
            style={{
              color: "#3388ff",
              weight: 1,
              fillOpacity: 0.2,
              className: "stadtteil",
            }}
            onEachFeature={onEachFeature}
          />
        )}

        {/* Alle Standorte ausgegraut anzeigen*/}
        {locations.map((location, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={location.coords}
            className="location-marker"
            opacity={0.5}
          />
        ))}

        {/* Marker beim Hovern hervorheben  */}
        {hoveredDistrict &&
          locations
            .filter((s) => s.stadtteil === hoveredDistrict)
            .map((location, idx) => (
              <Marker
                key={`hovered-${idx}`}
                position={location.coords}
                className="location-marker-active"
                zIndexOffset={15}
              >
                <Popup className="location-popup">
                  <h4>{location.name}</h4>
                  <p className="address">{location.beschreibung}</p>
                </Popup>
              </Marker>
            ))}
      </MapContainer>
    </div>
  );
}
