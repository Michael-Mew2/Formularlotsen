import * as React from "react";
import { useDialogStore } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dialog() {
  const { isDialogOpen, dialogContent, closeDialog } = useDialogStore();

  if (!isDialogOpen || !dialogContent) return null;

  return (
    <div className="dialog-overlay">
      <div
        className="dialog-content"
      >
        {dialogContent}
        <div
          className="close-button"
          onClick={closeDialog}
          aria-label="close button"
        >
          <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
        </div>
       {/*  <button onClick={closeDialog} style={{ marginTop: "10px" }}>
          Schließen
        </button> */}
      </div>
    </div>
  );
}
