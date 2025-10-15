import * as React from "react";
import { useLanguageStore } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faWheelchair,
  faPuzzlePiece,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import { useDialogStore } from "../store";
import LocationDialog from "./LocationDialog";

export default function TimeTable({ position }) {
  const [loading, setIsLoading] = React.useState(true);
  const [timeData, setTimeData] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { language } = useLanguageStore();
  const { openDialog } = useDialogStore();

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

        // Validierung der Accessibility-Daten
        if (data.locationData?.variables?.accessibility) {
          Object.values(data.locationData.variables.accessibility).forEach(
            (item) => {
              if (!item.id || !item.description || !item.icon) {
                console.warn("Ungültige Accessibility-Daten:", item);
              }
            }
          );
        }

        // console.log("Daten erfolgreich geladen:", data);
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
      console.log(
        "es wurde keine Daten bezüglich der Spalten gefunden!",
        timeData
      );
      return defaultColumns.slice(0, 3); // für schmale Bildschirme
    }

    // Anzahl der Spalten in Abhängigkeit zur Fenstergröße
    let visibleCount;
    if (windowWidth < 1180) visibleCount = 3;
    else if (windowWidth < 2028) visibleCount = 4;
    else visibleCount = 5;

    // console.log("screen:", windowWidth, "column-count:", visibleCount);
    const columns = Array.isArray(timeData.tableColumns)
      ? timeData.tableColumns
      : defaultColumns;
    // Gewählte Spalten
    return columns.slice(0, visibleCount);
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
    if (!timeData) return {};

    const grouped = {};

    timeData.data.locations.forEach((location) => {
      location.schedule.forEach((scheduleItem) => {
        const dayId = scheduleItem.dayId;

        const flattenedEntry = {
          ...location,
          schedule: [scheduleItem],
        };

        if (!grouped[dayId]) {
          grouped[dayId] = [];
        }

        grouped[dayId].push(flattenedEntry);
      });
    });

    Object.keys(grouped).forEach((dayId) => {
      grouped[dayId].sort((a, b) => {
        const timeA =
          timeData.variables.times.find((t) => t.id === a.schedule[0].timeId)
            ?.range || "";

        const timeB =
          timeData.variables.times.find((t) => t.id === b.schedule[0].timeId)
            ?.range || "";

        return parseTimeRange(timeA) - parseTimeRange(timeB);
      });
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
    // console.log("Rendering legend with data:", timeData);

    if (
      !timeData ||
      !timeData.pageTranslations?.table?.legendTitle ||
      !timeData.variables?.accessibility
    ) {
      console.log("No accessibility data found!");
      return null;
    }

    return (
      <div className="legend-container">
        <h6>{timeData.pageTranslations?.table?.legendTitle || "Legend"}</h6>
        <ul className="legend-list">
          {Object.entries(timeData.variables?.accessibility).map(
            ([id, iconData]) => (
              <li key={id} className="legend-list-item">
                <div key={id} className="legend-icon">
                  <FontAwesomeIcon icon={iconData.icon} />
                </div>
                <div className="legend-description">{iconData.description}</div>
              </li>
            )
          )}
        </ul>
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
      const columnCount = visibleColumns.length;
      return Array(columnCount).fill("1fr").join(" ");
    };

    return (
      <div className="grid-table-container">
        {/*Table Header*/}
        <div
          className="grid-header"
          style={{ gridTemplateColumns: getGridTemplate() }}
        >
          {/* {visibleColumns.map((columnId) => {
            
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
          })} */}
          {tableHeaders
            .filter((head) => visibleColumns.includes(head.id))
            .map((head) => (
              <div key={head.id} className="grid-header-cell">
                {head.title}
              </div>
            ))}
        </div>

        {/* Table Body*/}
        <div className="grid-body">
          {Object.entries(groupedData).map(([dayId, items]) =>
            items.map((item, itemIndex) => {
              const rowColor = dayId % 2 === 0 ? "even" : "odd";
              const visibleColumns = getVisibleColumns();
              const times = timeData.variables.times;
              const days = timeData.variables.days;

              const handleRowClick = () => {
                console.log("Zeile wurde geklickt", item);
                openDialog(<LocationDialog location={item} />);
              };

              return (
                <div
                  key={`${dayId}-${itemIndex}`}
                  className={`grid-row ${rowColor}`}
                  style={{ gridTemplateColumns: getGridTemplate() }}
                  onClick={handleRowClick}
                >
                  {/* Day Column */}
                  {visibleColumns.includes("day") && (
                    <div className="grid-cell day-cell">
                      {itemIndex === 0
                        ? days.find((d) => d.id === parseInt(dayId))?.name
                        : ""}
                    </div>
                  )}

                  {/* Time Column */}
                  {visibleColumns.includes("time") && (
                    <div className="grid-cell time-cell">
                      {
                        times.find((t) => t.id === item.schedule[0].timeId)
                          ?.range
                      }
                    </div>
                  )}

                  {/* Borough */}
                  {visibleColumns.includes("borough") && (
                    <div className="grid-cell borough-cell">{item.borough}</div>
                  )}

                  {/* Address */}
                  {visibleColumns.includes("address") && (
                    <div className="grid-cell address-cell">
                      {formatAddress(item.address)}
                    </div>
                  )}

                  {/* Accessibility */}
                  {visibleColumns.includes("features") && (
                    <div className="grid-cell features-cell">
                      {renderAccessibilityIcons(item.accessibilityIds)}
                    </div>
                  )}
                </div>
              );
            })
          )}
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
      <div className="table-title">
        <FontAwesomeIcon icon="fa-solid fa-clock" />
      </div>
      {renderGridTable()}
      {renderLegend()}
    </div>
  );
}
