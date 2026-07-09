import * as React from "react";
import { useLanguageStore } from "../store";

export default function GridTable() {
  const { texts, page } = useLanguageStore();

  const currentPage = page.split("/")[1];
  // console.log(texts);
  // console.log(currentPage);
  const currentPageData = texts[currentPage];
  // console.log(currentPageData);
  const tableSection = currentPageData.pageContent?.find(
    (section) => section.type ?? section._template === "table",
  );

  console.log(tableSection);

  if (!tableSection) return null;

  const { days, times, accessability, locations, tableHeads } =
    tableSection.data;

  return (
    <div className="grid-table">
      <h4>{tableSection.title}</h4>

      {/* table-head */}
      <div className="grid-header">
        {tableHeads.map((column, index) => (
          <div key={index}>
            <h5>{column.title}</h5>
          </div>
        ))}
      </div>

      {/* table-content */}
      <div className="grid-body">
        {days.map((day) => {
          const locationsForDay = locations.filter((location) =>
            location.schedule.some((schedule) => schedule.dayId === day.id),
          );

          if (locationsForDay.length === 0) return null;

          return (
            <React.Fragment key={day.id}>
              <div className="grid-cell day">
                <p>{day.name}</p>
              </div>

              {locationsForDay.map((location, index) => {
                return location.schedule.map((schedule, subIndex) => {
                  if (schedule.dayId !== day.id) return null;
                  const time =
                    times.find((t) => t.id === schedule.timeId)?.range ||
                    "Unbekannt";
                  const accessIcons = location.accessabilityIds.map((id) => {
                    const access = Object.values(accessability).find(
                      (a) => a.id === id,
                    );
                    return access ? (
                      <i
                        key={id}
                        className={`fa-solid ${access.icon}`}
                        aria-label={access.aria}
                      ></i>
                    ) : null;
                  });

                  return (
                    <React.Fragment key={`${index}-${subIndex} `}>
                      {/* time */}
                      <div className="grid-cell time">
                        <p>{time}</p>
                      </div>

                      {/* location + icons */}
                      <div className="grid-cell location" onClick={""}>
                        <div className="grid-cell-borough">
                          <p>{location.borough}</p>
                        </div>
                        <div className="grid-cell-location">
                          <p>{location.location}</p>
                        </div>
                        <div className="grid-cell-icons">{accessIcons}</div>
                      </div>
                    </React.Fragment>
                  );
                });
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
