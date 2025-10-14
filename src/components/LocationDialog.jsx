import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faWheelchair,
  faPuzzlePiece,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import useDialogStore from "../store/useDialogStore";

const locationDialog = ({ language }) => {
  const { isDialogOpen, selectedLocation, closeDialog } = useDialogStore();

  if (!isDialogOpen || !selectedLocation) return null;

  const renderAccessibilityIcons = (ids) => {
    const accessibilityIcons = {
      0: {
        icon: faWheelchair,
        description: "Rollstuhl gerecht",
        aria: "Bild mit einem Rollstuhl - Dieser Standort ist Rollstuhl gerecht",
      },
      1: {
        icon: faPuzzlePiece,
        description: "Spielzeuge und Malvorlagen",
        aria: "Bild mit einem Puzzelteil - Dieser Standort bietet Spiele für die Kinder",
      },
      2: {
        icon: faBaby,
        description: "Wickeltisch",
        aria: "Bild mit einem Baby - Dieser Standort bietet eine Wickelmöglichkeit für Babies und Kleinkinder",
      },
    };

    return (
      <div className="accessibility-icons">
        {ids.map((id) => {
          <span key={id} className="icon-wrapper">
            <FontAwesomeIcon
              icon={accessibilityIcons[id].icon}
              aria-label={accessibilityIcons[id].aria}
              title={accessibilityIcons[id].description}
            />
          </span>;
        })}
      </div>
    );
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <div className="dialog-header">
          <h2>{selectedLocation.borough}</h2>
          <button className="close-button" onClick={closeDialog}>
            &times;
          </button>
        </div>
        <div className="dialog-content">
          <p>
            <strong>Adresse: </strong>
            {selectedLocation.address.join(", ")}
          </p>
          <p>
            <strong>Öffnungszeiten:</strong>{" "}
            {selectedLocation.schedule.map((s) => (
              <span key={s.timeId}>
                {`${
                  selectedLocation.variables.days.find((d) => d.id === s.dayId)
                    ?.name
                }: ${
                  selectedLocation.variables.times.find(
                    (t) => t.id === s.timeId
                  )?.range
                }`}
              </span>
            ))}
          </p>
          {selectedLocation.additionalInformation?.publicTransport && (
            <p>
              <strong>Öffentliche Verkehrsmittel:</strong>{" "}
              {selectedLocation.additionalInformation.publicTransport.content}
            </p>
          )}
          <div className="accessibility-section">
            <strong>Besonderheiten:</strong>
            {renderAccessibilityIcons(selectedLocation.accessibilityIds)}
          </div>
        </div>
      </div>
    </div>
  );
};
