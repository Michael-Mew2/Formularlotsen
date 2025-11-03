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
// Wenn ich mal cluster (also mehrere Marker zusammenführen möchte) muss ich zu allererst react-leaflet-cluster installieren, dazu muss ich allerdings erst react-leaflet auf v4.2.1 downgraden. Dieser Code sollte auch problemlos unter v4.2.1 laufen (falls nicht leafletProvider vor und nach dem MapContainer hinzufügen). Erst dann die mit  ##Cluster markierten Kommentare auskommentieren!
//Oder alternative leaflet.markercluster verwenden!! (ist schon in v.5.0.0 vorhanden!)
// ##Cluster import MarkerClusterGroup from "react-leaflet-cluster";
import { useLanguageStore } from "../store";
import { useDialogStore } from "../store";
import mapData from "../data/stadtteile.json";
import LocationDialog from "./LocationDialog";

// ==========

// ==========

export default function BremerhavenMap({ position }) {
  const [locationData, setLocationData] = React.useState(null);
  const [fullData, setFullData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const { language } = useLanguageStore();
  const { openDialog, closeDialog } = useDialogStore();

  // Dialog mit Marker auf der Karte öffnen:
  const handleMarkerClick = (location) => {
    console.log("Marker geklickt:", location);
    openDialog(<LocationDialog location={location} />);
  };

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
        console.log("geoJSON-Data:", mapData);

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

  // Funktion zum Erstellen des Font Awesome Icons
  const createFontAwesomeIcon = () => {
    return new divIcon({
      html: `<div class="marker-icon">
             <i class="fas fa-map-pin"></i>
           </div>`,
      className: "font-awesome-icon",
      iconSize: [20, 34], // Größe des Icons
      iconAnchor: [19, 38], // Position des Icon-Ankers
      popUpAnchor: [0, -38], // Position des Popups relativ zum Icon
    });
  };

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

  // ##Cluster
  // Cluster-Icon erstellen:
  /* const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  }; */

  function onEachBorough(borough, layer) {
    const boroughName = borough.properties.BEZ_ST;
    console.log(boroughName);
    layer.bindPopup(boroughName);
  }

  // ----------
  return (
    <div
      className={`bremerhaven-map-container ${position}`}
      style={{ height: "600px" }}
    >
      {isLoading ? (
        <div className="map-loading">Map is loading...</div>
      ) : (
        <MapContainer
          center={[53.5395845, 8.5729424]} // Zentrum der Stadt
          zoom={11} // startwert
          maxZoom={11} // wievie man reinzoomen kann
          minZoom={11} // wieviel ma rauszoomen kann
          // Interaktionsmöglichkeiten der Karte (geblockt):
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
        >
          {/** Auskomentieren, falls komplete KArte gewünscht  */}
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}

          <GeoJSON data={mapData.features} onEachFeature={onEachBorough} />

          {/** ##Cluster  Kluster hier nicht notwendig aber da falls gewünscht:
           
          <MarkerClusterGroup
            chunkedLoading // Erlaubt es React alle Marker einzeln zu laden anstatt alle zusammen
            iconCreateFunction={createCustomClusterIcon}
          >
           */}
          {locationData?.map((marker, index) => (
            <Marker
              key={`marker-${index}`}
              position={[marker.pinPosition.lat, marker.pinPosition.lng]}
              // icon={customIcon}
              icon={createFontAwesomeIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              {
                // <Popup>{marker.location}</Popup>
                // Öffnet einen eigens von Leaflet erstellten Popup
              }
            </Marker>
          ))}
          {/* ##Cluster Nicht vergessen das mit auszukommentiern, wenn KLuster gewünscht sind!
          </MarkerClusterGroup>
            */}
        </MapContainer>
      )}
    </div>
  );
}
