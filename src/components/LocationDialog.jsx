import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLanguageStore } from "../store";
import LocationDialogContent from "./LocationDialogContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LocationDialog({ location }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [tabMode, setTabMode] = React.useState("borough"); // "borough" oder "schedule"
  const [boroughTabIndex, setBoroughTabIndex] = React.useState(0);
  const [locationTabIndex, setLocationTabIndex] = React.useState(0);
  const [dayTabIndex, setDayTabIndex] = React.useState(0);
  const [timeTabIndex, setTimeTabIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 580); // Größe des Fensters abfragen

  const [isInnerDropdownOpen, setIsInnerDropdownOpen] = React.useState(false);
  const [isOuterDropdownOpen, setIsOuterDropdownOpen] = React.useState(false);

  const { language } = useLanguageStore();

  const toggleRef = React.useRef(null);
  const outerContainerRef = React.useRef(null);

  // Reaktion auf Änderungen der Fenstergröße
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 580);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  React.useEffect(() => {
    const toggleBox = toggleRef.current;
    const outerContainer = outerContainerRef.current;

    if (toggleBox && outerContainer) {
      const toggleBoxHeight = toggleBox.offsetHeight;

      const computedStyles = window.getComputedStyle(outerContainer);

      const borderTop = parseFloat(computedStyles.borderTopWidth);
      const borderBottom = parseFloat(computedStyles.borderBottomWidth);

      const totalOffset = toggleBoxHeight + borderTop + borderBottom;

      console.log("toggleHeight", toggleBoxHeight);
      console.log("borderTop/Bottom", borderTop, borderBottom);
      console.log("totalOffset", totalOffset);

      outerContainer.style.height = `calc(100% - ${totalOffset}px)`;
    }
  }, [data, tabMode]);

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

  // Abrufen der Tage
  const getDayName = (dayId) => {
    if (!data?.locationData?.variables?.days?.length) return "Unbekannt";
    const day = data.locationData.variables.days.find((d) => d.id === dayId);
    return day ? day.name : "Unbekannt";
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

  const currentLocation =
    tabMode === "borough"
      ? locationsByBorough[Object.keys(locationsByBorough)[boroughTabIndex]]?.[
          locationTabIndex
        ]
      : locationsByDay[Object.keys(locationsByDay)[dayTabIndex]]?.[
          timeTabIndex
        ];

  const getAccessibilityInfo = (accessibilityIds) => {
    if (!data?.locationData?.variables.accessibility) return [];

    return Object.entries(data.locationData.variables.accessibility)
      .filter(([__, accessibility]) =>
        accessibilityIds.includes(accessibility.id)
      )
      .map(([_, accessibility]) => ({
        icon: accessibility.icon,
        description: accessibility.descriptionShort,
        aria: accessibility.aria,
      }));
  };

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
      <div className="toggle-switch-container" ref={toggleRef}>
        <span
          className={`toggle-label ${tabMode === "borough" ? "active" : ""}`}
          onClick={() => setTabMode("borough")}
        >
          {isMobile ? (
            <FontAwesomeIcon icon="fa-solid fa-map" />
          ) : (
            "Nach Stadtteilen"
          )}
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
          {isMobile ? (
            <FontAwesomeIcon icon="fa-solid fa-clock" />
          ) : (
            "Nach Tagen"
          )}
        </span>
      </div>

      {/* Container für Inhalt und innerer Tabs */}
      <div className="content-and-inner-tabs-container" ref={outerContainerRef}>
        {/* Content des LocationDialogs */}
        <LocationDialogContent
          location={currentLocation}
          getTimeRange={getTimeRange}
          getDayName={getDayName}
          getAccessibilityInfo={getAccessibilityInfo}
        />

        {tabMode === "borough" ? (
          /* Innere Tabs: Standorte pro Stadtteil - MITTE */
          isMobile ? (
            // MOBILE VERSION mit Dropdown
            <div className="mobile-tab-dropdown">
              {/* Aktiver Tab immer sichtbar */}
              <div className="active-mobile-tab">
                {
                  locationsByBorough[
                    Object.entries(locationsByBorough)[boroughTabIndex][0]
                  ][locationTabIndex].location
                }
              </div>

              {/* Dropdown-Button für weitere Tabs */}
              {locationsByBorough[
                Object.entries(locationsByBorough)[boroughTabIndex][0]
              ].length > 1 && (
                <>
                  <button
                    className="mobile-dropdown-toggle"
                    onClick={() => setIsInnerDropdownOpen(!isInnerDropdownOpen)}
                  >
                    ...
                  </button>

                  {isInnerDropdownOpen && (
                    <div className="mobile-dropdown-menu">
                      {locationsByBorough[
                        Object.entries(locationsByBorough)[boroughTabIndex][0]
                      ].map((loc, locIndex) => {
                        // aktiven Tab überspringen
                        if (locIndex === locationTabIndex) return null;

                        return (
                          <div
                            key={locIndex}
                            className="mobile-dropdown-item"
                            onClick={() => {
                              setLocationTabIndex(locIndex);
                              setIsInnerDropdownOpen(false);
                            }}
                          >
                            {loc.location}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            // DESKTOP VERSION
            <Tabs
              selectedIndex={locationTabIndex}
              onSelect={(tabIndex) => {
                setLocationTabIndex(tabIndex);
              }}
            >
              <TabList className="inner-tabs">
                {locationsByBorough[
                  Object.entries(locationsByBorough)[boroughTabIndex][0]
                ].map((loc, locIndex) => (
                  <Tab key={locIndex} className="inner-tab">
                    {loc.location}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          )
        ) : /* Innere Tabs: Uhrzeiten - MITTE */
        isMobile ? (
          // MOBILE VERSION mit Dropdown
          <div className="mobile-tab-dropdown">
            <div className="active-mobile-tab">
              {locationsByDay[Object.keys(locationsByDay)[dayTabIndex]][timeTabIndex].timeRange}
            </div>

            {locationsByDay[Object.keys(locationsByDay)[dayTabIndex]].length >
              1 && (
              <>
                <button
                  className="mobile-dropdown-toggle"
                  onClick={() => setIsInnerDropdownOpen(!isInnerDropdownOpen)}
                >
                  ...
                </button>

                {isInnerDropdownOpen && (
                  <div className="mobile-dropdown-menu">
                    {locationsByDay[
                      Object.keys(locationsByDay)[dayTabIndex]
                    ].map((loc, locIndex) => {
                      // aktiven Tab überspringen
                      if (locIndex === timeTabIndex) return null;

                      return (
                        <div
                          key={locIndex}
                          className="mobile-dropdown-item"
                          onClick={() => {
                            setTimeTabIndex(locIndex);
                            setIsInnerDropdownOpen(false);
                          }}
                        >
                          {loc.timeRange}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // DESKTOP VERSION
          <Tabs
            selectedIndex={timeTabIndex}
            onSelect={(tabIndex) => {
              setTimeTabIndex(tabIndex);
            }}
          >
            <TabList className="inner-tabs">
              {locationsByDay[Object.keys(locationsByDay)[dayTabIndex]]?.map(
                (loc, locIndex) => (
                  <Tab key={locIndex} className="inner-tab">
                    {loc.timeRange}
                  </Tab>
                )
              )}
            </TabList>
          </Tabs>
        )}
      </div>

      {/* Äuere Tabs: Stadtteile/Tage - Unten */}
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
        </Tabs>
      ) : (
        /* Tabs nach Tagen und Uhrzeiten: */
        <Tabs
          selectedIndex={dayTabIndex}
          onSelect={(index) => {
            setDayTabIndex(index);
            setTimeTabIndex(0);
          }}
        >
          {/* Äußere Tabs: Tage - Unten */}
          <TabList className="outer-tabs">
            {Object.keys(locationsByDay).map((day, index) => (
              <Tab key={index} className="outer-tab">
                {day}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      )}
    </div>
  );
}
