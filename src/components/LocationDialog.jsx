import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLanguageStore } from "../store";

export default function LocationDialog({ location }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(location);

  const { language } = useLanguageStore();

  // Daten fetchen (Stadtteile/Standorte)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `texte/locales/components/locationData/${language}.json`
        );
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

        const jsonData = await response.json();
        setData(jsonData);
        // console.warn("Geladene Daten:", jsonData);
        // console.log("Das sind die locations aus locationData.data.locations:", jsonData.locationData.data.locations);
        
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  // Standorte nach Stadtteilen Gruppieren
  const groupLocationsByBorough = (locations) => {
    const grouped = {};
    // console.log("Zu gruppierende Standorte:",locations);
    
    locations.forEach((loc) => {
      if (!grouped[loc.borough]) {
        grouped[loc.borough] = [];
      }
      grouped[loc.borough].push(loc);
    });
    return grouped;
  };

  // Ladeanzeige
  if (loading) {
    return <div>Daten werden geladen...</div>;
  }

  // Fehleranzeige
  if (error) {
    return <div>Fehler: {error}</div>;
  }

  // Daten nicht verfügbar
  if (!data) {
    return <div>Keine Daten verfügbar.</div>;
  }

  // Start Standorte nach Stadtteilen gruppieren
  const locationsByBorough = groupLocationsByBorough(data.locationData.data.locations);

  return (
    <div className="location-dialog-content">
      {/* Tabs für Stadtteile */}
      <Tabs
        onSelect={(index) => {
          const boroughs = Object.keys(locationsByBorough);
          const selectedBorough = boroughs[index];
          const firstLocation = locationsByBorough[selectedBorough][0];
          setSelectedLocation(firstLocation);
        }}
      >
        {/* Äußere Tabs: Stadtteile */}
        <TabList className="outer-tabs">
          {Object.keys(locationsByBorough).map((borough, index) => (
            <Tab key={index} className="outer-tab">
              {borough}
            </Tab>
          ))}
        </TabList>

        {/* Innere Tabs: Standorte pro Stadtteil */}
        {Object.entries(locationsByBorough).map(
          ([borough, locations], boroughIndex) => (
            <TabPanel key={boroughIndex}>
              <Tabs
                onSelect={(tabIndex) => {
                  setSelectedLocation(locations[tabIndex]); // Aktualisiert den Inhalt des Dialogfensters beim wechsel des inneren Tabs
                }}
              >
                <TabList className="inner-tabs">
                  {locations.map((loc, locIndex) => (
                    <Tab key={locIndex} className="inner-tab">
                      {loc.location}
                    </Tab>
                  ))}
                </TabList>

                {/* Inhalt des Dialogfensters: */}
                {locations.map((loc, locIndex) => (
                  <TabPanel key={locIndex}>

                    {/* Der sich automatisch aktualisierende Inhalt: */}
                    <h2>{selectedLocation.location}</h2>
                    <p>Adresse: {selectedLocation.address.join(", ")}</p>
                    {/* <p>
                      Öffnungszeiten:{" "}
                      {selectedLocation.schedule
                        .map((scheduleItem) => {
                          const day = data.days.find(
                            (d) => d.id === scheduleItem.dayId
                          )?.name;
                          const time = data.times.find(
                            (t) => t.id === scheduleItem.timeId
                          )?.range;
                          return `${day}: ${time}`;
                        })
                        .join(", ")}
                    </p> */}
                    <p>
                      Erreichbarkeit:{" "}
                      {
                        selectedLocation.additionalInformation.publicTransport
                          .content
                      }
                    </p>

                  </TabPanel>
                ))}
              </Tabs>
            </TabPanel>
          )
        )}
      </Tabs>
    </div>
  );
}
