import * as React from "react";

export default function LegalCheckbox({ section }) {
  const [accepted, setAccepted] = React.useState(false);

  React.useEffect(() => {
    console.log("ist in der Checkbox-Komponente:", section);
    
  }, []);

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
      <label className="legal-checkbox">
        <input
          type="checkbox"
          name={section.id}
          id={section.id}
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required={section.required}
        />
        <span>{section.label}</span>
      </label>
    </div>
  );
}
