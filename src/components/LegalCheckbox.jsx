import * as React from "react";

export default function LegalCheckbox({ section, onValidationChange }) {
  const [accepted, setAccepted] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    console.log("ist in der Checkbox-Komponente:", section);
  }, []);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setAccepted(isChecked);
    setTouched(true);

    // Stattus wird an Parent weitergegeben
    if (onValidationChange) {
      onValidationChange(
        section.name || section.id,
        !isChecked && section.required
      );
    }
  };

  const showError = touched && !accepted && section.required;

  return (
    <div className="legal-checkbox-wrapper">
      <a
        href={section.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="legal-link"
      >
        {section.linkText}
      </a>
      <label className={`legal-checkbox ${section.required ? "required" : ""}`}>
        <input
          type="checkbox"
          name={section.id}
          id={section.id}
          checked={accepted}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          required={section.required}
        />
        <span className="label-text">{section.label}</span>
      </label>
      {showError && section.errorMessage && (
        <span className="error-message">{section.errorMessage}</span>
      )}
    </div>
  );
}
