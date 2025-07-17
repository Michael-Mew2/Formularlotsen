import * as React from "react";
import { useLanguageStore } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faWheelchair,
  faPuzzlePiece,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";

export default function TimeTable({ position }) {
  const [loading, setIsLoading] = React.useState(true);
  const [timeData, setTimeData] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { language } = useLanguageStore();

  // Überprüfe Fenstergröße
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lade location-JSON-Datei
  React.useEffect(() => {
    const loadTimeInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `texte/locales/components/locationData/${language}.json`
        );
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

        const data = await response.json();
        console.log("Daten erfolgreich geladen:", data);
        setTimeData(data.locationData);
        setIsLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden der Daten", error);
        setIsLoading(false);
      }
    };

    loadTimeInfo();
  }, [language]);

  //Parsen der Uhrzeiten
  const parseTimeRange = (timeRange) => {
    if (!timeRange) return 0;

    const cleanedRange = timeRange.replace(/Uhr/g, "").trim();

    const match = cleanedRange.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  // Bestimmung der Spaltenanzahl in Abhängigkeit der Fenstergröße
  const getVisibleColumns = () => {
    // Fallback
    const defaultColumns = ["day", "time", "borough"];
    if (!timeData.tableColumns) {
        console.log("es wurde keine Daten bezüglich der Spalten gefunden!", timeData);
      return defaultColumns.slice(0, 3); // für schmale Bildschirme
    }

    // Anzahl
    let visibleCount;
    if (windowWidth < 768) visibleCount = 3;
    else if (windowWidth < 2028) visibleCount = 4;
    else visibleCount = 5;

    console.log("screen:", windowWidth, "column-count:", visibleCount);
     

    // Gewählte Spalten
    return timeData.tableColumns.slice(0, visibleCount);
  };

  // Sortieren der Standorte nach Tag und Uhrzeit
  const getSortedData = () => {
    if (!timeData) return [];

    const locations = [...timeData.data.locations]; // Daten kopieren

    // Sortierfunktion
    return locations.sort((a, b) => {
      // Tag sortieren:
      if (a.schedule[0].dayId !== b.schedule[0].dayId) {
        return a.schedule[0].dayId - b.schedule[0].dayId;
      }

      // Zeiten sortieren (in Abhängigkeit der Uhrzeit, nicht der time.id!)
      const timeA =
        timeData.variables.times.find((t) => t.id === a.schedule[0].timeId)
          ?.range || "";
      const timeB =
        timeData.variables.times.find((t) => t.id === b.schedule[0].timeId)
          ?.range || "";

      return parseTimeRange(timeA) - parseTimeRange(timeB);
    });
  };

  // Gruppieren nach Tagen
  const getGroupedByDay = () => {
    const sortedData = getSortedData();
    const grouped = {};

    sortedData.forEach((item) => {
      const dayId = item.schedule[0].dayId;
      if (!grouped[dayId]) {
        grouped[dayId] = [];
      }
      grouped[dayId].push(item);
    });

    return grouped;
  };

  // Accessibility-Icons
  const renderAccessibilityIcons = (ids) => {
    if (!timeData || !timeData.variables.accessibility) return null;

    return (
      <div className="accessibility-icons">
        {ids.map((id) => {
          const iconData = Object.values(timeData.variables.accessibility).find(
            (item) => item.id === id
          );

          if (!iconData) return null;

          return (
            <span key={id} className="icon-wrapper">
              <FontAwesomeIcon
                icon={iconData.icon}
                aria-label={iconData.aria}
                title={iconData.description}
              />
            </span>
          );
        })}
      </div>
    );
  };

  //Adresse formatieren
  const formatAddress = (addressArray) => {
    return addressArray.join(", ");
  };

  // render der Legende
  const renderLegend = () => {
    if (
      !timeData ||
      !timeData.pageTranslations?.table?.legend ||
      !timeData.variables?.accessibility
    )
      return null;

    return (
      <div className="table-legend">
        <h3>{timeData.pageTranslations.table.legendTitle}</h3>
        {Object.entries(timeData.variables.accessibility).map(
          ([id, description]) => (
            <div key={id} className="table-legend-item">
              <FontAwesomeIcon
                icon={timeData.variables.accessibility[id]?.icon}
              />
              <span>{description}</span>
            </div>
          )
        )}
      </div>
    );
  };

  // CSS_Grid Tabelle:
  const renderGridTable = () => {
    const visibleColumns = getVisibleColumns();
    const groupedData = getGroupedByDay();
    const days = timeData.variables?.days;
    const times = timeData.variables.times;
    const tableHeaders = timeData.pageTranslations?.table?.tableHeads || {};

    // Template für verschiedene Spaltenanzahlen
    const getGridTemplate = () => {
      return visibleColumns.map(() => "1fr").join(" ");
    };

    return (
      <div className="grid-table-container">
        {/*Table Header*/}
        <div
          className="grid-header"
          style={{ gridTemplateColumns: getGridTemplate() }}
        >
          {visibleColumns.map((columnId) => {
            // Überschrift in den tableHeads suchen
            const header = timeData.pageTranslations.table.tableHeads.find(
              (head) => head.id === columnId
            );

            console.log(header);

            return (
              <div key={columnId} className="grid-header-cell">
                {header?.title || columnId}
              </div>
            );
          })}
        </div>

        {/* Table Body*/}
        <div className="grid-body">
          {Object.entries(groupedData).map(([dayId, items]) => (
            <React.Fragment key={dayId}>
              {items.map((item, itemIndex) => {
                const isFirstItemOfDay = itemIndex === 0;
                const rowColor = dayId % 2 === 0 ? "even" : "odd";

                return (
                  <div
                    key={`${dayId}-${itemIndex}`}
                    className={`grid-row ${rowColor}`}
                    style={{ gridTemplateColumns: getGridTemplate() }}
                  >
                    {visibleColumns.includes("day") && isFirstItemOfDay && (
                      <div
                        className="grid-cell"
                        style={{ gridRow: `span ${items.length}` }}
                      >
                        {days.find((d) => d.id === parseInt(dayId))?.name}
                      </div>
                    )}
                    {visibleColumns.includes("time") && (
                      <div className="grid-cell">
                        {
                          times.find((t) => t.id === item.schedule[0].timeId)
                            .range
                        }
                      </div>
                    )}
                    {visibleColumns.includes("borough") && (
                      <div className="grid-cell">{item.borough}</div>
                    )}
                    {visibleColumns.includes("address") && (
                      <div className="grid-cell">
                        {formatAddress(item.address)}
                      </div>
                    )}
                    {visibleColumns.includes("features") && (
                      <div className="grid-cell">
                        {renderAccessibilityIcons(item.accessibilityIds)}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Ladeanzeige
  if (loading) {
    return <div className="loading">Lade Daten...</div>;
  }

  // Fehleranzeige
  if (!timeData) {
    return <div className="error">Fehler beim Laden der Daten!</div>;
  }

  return (
    <div className={`time-table ${position}`}>
      {renderGridTable()}
      {renderLegend()}
    </div>
  );
}
