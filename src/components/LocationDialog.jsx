import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLanguageStore } from "../store";

export default function LocationDialog({ location }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [tabMode, setTabMode] = React.useState("borough"); // "borough" oder "schedule"
  const [boroughTabIndex, setBoroughTabIndex] = React.useState(0);
  const [locationTabIndex, setLocationTabIndex] = React.useState(0);
  const [dayTabIndex, setDayTabIndex] = React.useState(0);
  const [timeTabIndex, setTimeTabIndex] = React.useState(0);

  const { language } = useLanguageStore();

  // Daten fetchen
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

  // Hilfsfunktion für sicheres Abrufen der Uhrzeit
  const getTimeRange = (timeId) => {
    return (
      data.locationData.variables.times.find((t) => t.id === timeId)?.range ||
      "Unbekannt"
    );
  };

  // Standorte nach Tagen gruppieren
  const groupLocationsByDay = (locations) => {
    const grouped = {};
    locations.forEach((loc) => {
      loc.schedule.forEach((scheduleItem) => {
        const dayId = scheduleItem.dayId;
        const dayName = data.locationData.variables.days[dayId].name;
        if (!dayName) return;

        if (!grouped[dayName]) grouped[dayName] = [];

        const exists = grouped[dayName].some(
          (existingLocation) => existingLocation.location === loc.location
        );
        if (exists) return;

        grouped[dayName].push({
          ...loc,
          timeRange: getTimeRange(scheduleItem.timeId),
          dayId: scheduleItem.dayId,
          timeId: scheduleItem.timeId,
        });
      });
    });
    return grouped;
  };

  // Setzten der initialen Tab-Indizes, sobald alles geladen wurde
  React.useEffect(() => {
    if (!data) return;

    const locationsByBorough = groupLocationsByBorough(
      data.locationData.data.locations
    );

    const timesByDay = groupLocationsByDay(data.locationData.data.locations);

    const boroughs = Object.keys(locationsByBorough);
    const boroughIndex = boroughs.findIndex((b) => b === location.borough);
    if (boroughIndex !== -1) {
      setBoroughTabIndex(boroughIndex);

      const locationsInBorough = locationsByBorough[location.borough];
      const locationIndex = locationsInBorough.findIndex(
        (loc) => loc.location === location.location
      );

      if (locationIndex !== -1) {
        setLocationTabIndex(locationIndex);
      }
    }

    // Initial-Tabs für Tage setzen
    const days = Object.keys(timesByDay);
    const dayName =
      data.locationData.variables.days[location.schedule[0].dayId].name;
    const dayIndex = days.findIndex((d) => d === dayName);

    if (dayIndex !== -1) {
      setDayTabIndex(dayIndex);

      const timesInDay = timesByDay[days[dayIndex]];
      const timeIndex = timesInDay.findIndex(
        (loc) => loc.location === location.location
      );
      if (timeIndex !== -1) {
        setTimeTabIndex(timeIndex);
      }
    }
  }, [data, location]);

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

  // Start Daten (Stadtteile/Tage) gruppieren
  const locationsByBorough = groupLocationsByBorough(
    data.locationData.data.locations
  );
  const locationsByDay = groupLocationsByDay(data.locationData.data.locations);

  // Initial-Tabs für Stadtteile --> Standorte finden
  // Ersetzt durch useEffect
  /*   const findInitialTabIndices = () => {
    const boroughs = Object.keys(locationsByBorough);
    const boroughIndex = boroughs.findIndex((b) => b === location.borough);
    if (boroughIndex === -1) return { boroughIndex: 0, locationIndex: 0 };

    const locationsInBorough = locationsByBorough[location.borough];
    const locationIndex = locationsInBorough.findIndex(
      (loc) => loc.location === location.location
    );

    console.log(
      "findInitialTabIndices -- boroughs:",
      boroughs,
      "boroughIndex:",
      boroughIndex,
      "locationsInBorough:",
      locationsInBorough,
      "locationIndex:",
      locationIndex
    );

    return {
      boroughIndex: boroughIndex !== -1 ? boroughIndex : 0,
      locationIndex: locationIndex !== -1 ? locationIndex : 0,
    };
  };

  // Initial-Tabs für Tage --> Uhrzeiten finden
  const findInitialDayIndices = () => {
    const days = Object.keys(locationsByDay);
    const dayName =
      data.locationData.variables.days[location.schedule[0].dayId].name;
    const dayIndex = days.findIndex((d) => d === dayName);
    const locationsInDay =
      dayIndex !== -1 ? locationsByDay[days[dayIndex]] : [];
    const locationIndex = locationsInDay.findIndex(
      (l) => l.location === location.location
    );
    return {
      dayIndex: dayIndex !== -1 ? dayIndex : 0,
      locationIndex: locationIndex !== -1 ? locationIndex : 0,
    };
  };

  const {
    boroughIndex: initialBoroughIndex,
    locationIndex: initialLocationIndex,
  } = findInitialTabIndices();

  const {
    dayIndex: initialDayIndex,
    locationIndex: initialDayLocationIndex,
  } = findInitialDayIndices(); */

  return (
    <div className="location-dialog-content">
      {/* Switch-Button für Tab-Modi */}
      <div className="toggle-switch-container">
        <span
          className={`toggle-label ${tabMode === "borough" ? "active" : ""}`}
          onClick={() => setTabMode("borough")}
        >
          Nach Stadtteilen
        </span>

        <div className="toggle-switch">
          <input
            type="checkbox"
            id="toggle"
            checked={tabMode === "schedule"}
            onChange={() =>
              setTabMode(tabMode === "borough" ? "schedule" : "borough")
            }
          />
          <label htmlFor="toggle" className="slider"></label>
        </div>

        <span
          className={`toggle-label ${tabMode === "schedule" ? "active" : ""}`}
          onClick={() => setTabMode("schedule")}
        >
          Nach Tagen
        </span>
      </div>

      {/* Konditioniertes rendern der Tabs: */}
      {tabMode === "borough" ? (
        /* Tabs nach Stadtteilen und Standorten: */
        <Tabs
          selectedIndex={boroughTabIndex}
          onSelect={(index) => {
            setBoroughTabIndex(index);
            setLocationTabIndex(0);
            // Ersetzt (wird dank useEffect nicht mehr benötigt)
            /* setBoroughTabIndex(index);
            const boroughs = Object.keys(locationsByBorough);
            const selectedBorough = boroughs[index];
            const firstLocation = locationsByBorough[selectedBorough][0];
            setSelectedLocation(firstLocation); */
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
                  selectedIndex={
                    boroughIndex === boroughTabIndex ? locationTabIndex : 0
                  }
                  onSelect={(tabIndex) => {
                    setLocationTabIndex(tabIndex);
                    // ersetzt
                    //setSelectedLocation(locations[tabIndex]); // Aktualisiert den Inhalt des Dialogfensters beim wechsel des inneren Tabs
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
                      <h2>{loc.location}</h2>
                      <p>Adresse: {loc.address.join(", ")}</p>
                      <p>
                        Uhrzeit:{" "}
                        {loc.schedule
                          .map((scheduleItem) =>
                            getTimeRange(scheduleItem.timeId)
                          )
                          .join(", ")}
                      </p>
                      <p>
                        Erreichbarkeit:{" "}
                        {loc.additionalInformation.publicTransport.content}
                      </p>
                    </TabPanel>
                  ))}
                </Tabs>
              </TabPanel>
            )
          )}
        </Tabs>
      ) : (
        /* Tabs nach Tagen und Uhrzeiten: */
        <Tabs
          selectedIndex={dayTabIndex}
          onSelect={(index) => {
            setDayTabIndex(index);
            setTimeTabIndex(0);
            //Ersetzt da wir dank der useEffect auf die State zugreifen
            /*  const days = Object.keys(locationsByDay);
            const selectedDay = days[index];
            const firstLocation = locationsByDay[selectedDay][0];
            setSelectedLocation(firstLocation); */
          }}
        >
          {/* Äußere Tabs: Tage */}
          <TabList className="outer-tabs">
            {Object.keys(locationsByDay).map((day, index) => (
              <Tab key={index} className="outer-tab">
                {day}
              </Tab>
            ))}
          </TabList>
          {Object.entries(locationsByDay).map(([day, locations], dayIndex) => (
            <TabPanel key={dayIndex}>
              <Tabs
                selectedIndex={dayIndex === dayTabIndex ? timeTabIndex : 0}
                onSelect={(tabIndex) => {
                  setTimeTabIndex(tabIndex);
                  // Ersetzt
                  /* setSelectedLocation(locations[tabIndex]); // Aktualisiert den Inhalt des Dialogfensters beim wechsel des inneren Tabs */
                }}
              >
                <TabList className="inner-tabs">
                  {locations.map((loc, locIndex) => (
                    <Tab key={locIndex} className="inner-tab">
                      {loc.timeRange}{" "}
                      {/* Das ist der Inhalt des inneren Tabs!! */}
                    </Tab>
                  ))}
                </TabList>
                {locations.map((loc, locIndex) => (
                  <TabPanel key={locIndex}>
                    {/* Der sich automatisch aktualisierende Inhalt: */}
                    <h2>{loc.location}</h2>
                    <p>Adresse: {loc.address.join(", ")}</p>
                    <p>Uhrzeit: {loc.timeRange}</p>
                    <p>
                      Erreichbarkeit:{" "}
                      {loc.additionalInformation.publicTransport.content}
                    </p>
                  </TabPanel>
                ))}
              </Tabs>
            </TabPanel>
          ))}
        </Tabs>
      )}
    </div>
  );
}
