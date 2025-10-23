import * as React from "react";
import { useDialogStore } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dialog() {
  const { isDialogOpen, dialogContent, closeDialog } = useDialogStore();

  const dialogBoxRef = React.useRef(null);
  const dialogContentRef = React.useRef(null);
  const dialogCloseButtonRef = React.useRef(null);

  React.useEffect(() => {
    const dialogBox = dialogBoxRef.current;
    const dialogContent = dialogContentRef.current;
    const dialogCloseButton = dialogCloseButtonRef.current;

    // console.log("dialogbox", dialogBox);
    // console.log("dialogContent", dialogContent);
    // console.log("dialogCloseButton", dialogCloseButton);

    

    if (dialogBox && dialogContent && dialogCloseButton) {
      const closeButtonHeight = dialogCloseButton.offsetHeight;

      const additionalSpacing = 0;
      const additionalBoxSpacing = 0;

      dialogContent.style.marginTop = `${
        closeButtonHeight / 2 + additionalSpacing
      }px`;
      dialogBox.style.marginTop = `${
        closeButtonHeight / 2 + additionalBoxSpacing
      }px`;

      // console.log("dialogContent.style.marginTop=", dialogContent.style.marginTop);
      
    }
  }, [isDialogOpen, dialogContent]);

  if (!isDialogOpen || !dialogContent) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content-container" ref={dialogBoxRef}>
        <div className="dialog-inner-box">
          <div className="dialog-content" ref={dialogContentRef}>
            {dialogContent}
          </div>
          <div
            ref={dialogCloseButtonRef}
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
    </div>
  );
}
