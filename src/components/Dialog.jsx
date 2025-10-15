import * as React from "react";
import { useDialogStore } from "../store";

export default function Dialog() {
  const { isDialogOpen, dialogContent, closeDialog } = useDialogStore();

  if (!isDialogOpen || !dialogContent) return null;

  return (
    <div
      className="dialog-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="dialog-content"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          zIndex: 990,
        }}
      >
        {dialogContent}
        <button
          onClick={closeDialog}
          style={{ marginTop: "10px" }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
