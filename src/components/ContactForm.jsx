import * as React from "react";
import PageSection from "./PageSection";

export default function ContactForm({
  fieldsets,
  title,
  showTitle,
  items,
  submitButton,
}) {
  const [formErrors, setFormErrors] = React.useState({});
  const [touchedFields, setTouchedFields] = React.useState({});
  const [activeFieldset, setActiveFieldset] = React.useState(0);
  const [legalErrors, setLegalErrors] = React.useState({});

  const fieldInfoTexts = React.useMemo(() => {
    const infoTexts = {};
    fieldsets.forEach((fieldset) => {
      fieldset.fields?.forEach((field) => {
        if (field.infoText) {
          infoTexts[field.name] = field.infoText;
        }
      });
    });
    return infoTexts;
  }, [fieldsets]);

  const [activeInfo, setActiveInfo] = React.useState(() => {
    const initialInfo = {};
    Object.keys(fieldInfoTexts).forEach((key) => {
      initialInfo[key] = fieldInfoTexts[key]?.default || "";
    });
    return initialInfo;
  });

  React.useEffect(() => {
    console.log("content:", fieldsets);
    console.log("Show contact title;", showTitle);
    console.log("Titel:", title);
    console.log("Items:", items);
    console.log("Button:", submitButton);
  }, [fieldsets]);

  const handleFieldError = (fieldName, hasError) => {
    if (fieldInfoTexts[fieldName]) {
      setActiveInfo((prev) => ({
        ...prev,
        [fieldName]: hasError
          ? fieldInfoTexts[fieldName]?.error
          : fieldInfoTexts[fieldName]?.default,
      }));
    }
  };

  const handelBlur = (e) => {
    const { name, value, required, type } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    let hasError = false;

    if (required && !value.trim()) {
      hasError = true;
    } else if (
      type === "email" &&
      value &&
      !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      hasError = true;
    }

    setFormErrors((prev) => ({ ...prev, [name]: hasError }));
    handleFieldError(name, hasError);
  };

  const handleFocus = (fieldName) => {
    if (!formErrors[fieldName] && fieldInfoTexts[fieldName]) {
      setActiveInfo((prev) => ({
        ...prev,
        [fieldName]: fieldInfoTexts[fieldName]?.default,
      }));
    }
  };

  const handleLegalValidation = (checkboxName, hasError) => {
    setLegalErrors((prev) => ({ ...prev, [checkboxName]: hasError }));
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      id: field.name,
      placeholder: field.placeholder,
      required: field.required,
      onFocus: () => handleFocus(field.name),
      onBlur: handelBlur,
      className:
        touchedFields[field.name] && formErrors[field.name] ? "error" : "",
    };

    switch (field.type) {
      case "textarea":
        return (
          <label key={field.name}>
            {field.label}
            <textarea {...commonProps}></textarea>
          </label>
        );

      default:
        return (
          <label key={field.name}>
            {field.label}
            <input type={field.type} {...commonProps} />
          </label>
        );
    }
  };

  const getFieldsetInfo = (fieldset) => {
    // Fehlerüberprüfung
    const hasError = fieldset.fields?.some(
      (field) => touchedFields[field.name] && formErrors[field.name]
    );

    if (hasError) {
      // Ersten Fehler azeigen:
      const errorField = fieldset.fields?.find(
        (field) => touchedFields[field.name] && formErrors[field.name]
      );
      return activeInfo[errorField?.name];
    }
    // Zeige groupInfoText oder Info des fokussierten Feldes
    return fieldset.groupInfoText || "";
  };

  const getLegalFieldsetInfo = (fieldset) => {
    const hasErrors = Object.values(legalErrors).some(
      (error) => error === true
    );

    if (hasErrors) {
      return fieldset.groupInfoError || "";
    }
    return fieldset.groupInfoText || "";
  };

  // Accordion mit Validierungs-Callbacks rendern
  const renderLegalAccordion = (fieldset) => {
    const enhancedAccordion = {
      ...fieldset.accordion,
      items: fieldset.accordion.items?.map((item) => ({
        ...item,
        contentGroups: item.contentGroups?.map((group) => ({
          items: group.items?.map((groupItem) => ({
            ...groupItem,
            component:
              groupItem.component?.type === "checkbox"
                ? {
                    ...groupItem.component,
                    onValidationChange: handleLegalValidation,
                  }
                : groupItem.component,
          })),
        })),
      })),
    };

    return (
      <PageSection section={{ type: "accordion", ...enhancedAccordion }} />
    );
  };

  return (
    <div className="contact-form">
      {showTitle && <h4>{title}</h4>}
      <form>
        {fieldsets?.map((fieldset, index) => {
          // Accordion für rechtliche Hinweise
          if (fieldset.type === "legal-accordion") {
            const hasLegalErrors = Object.values(legalErrors).some(
              (error) => error === true
            );

            return (
              <fieldset key={index} className="legal-fieldset">
                <legend>{fieldset.legend}</legend>
                <div className="fieldset-flex">
                  <div className="form-inputs">
                    {renderLegalAccordion(fieldset)}
                  </div>
                  {(fieldset.groupInfoText || fieldset.groupInfoError) && (
                    <div
                      className={`form-info ${hasLegalErrors ? "error" : ""}`}
                    >
                      <p>{getLegalFieldsetInfo(fieldset)}</p>
                    </div>
                  )}
                </div>
              </fieldset>
            );
          }
          // Normale Fieldsets
          return (
            <fieldset key={index}>
              <legend>{fieldset.legend}</legend>
              <div className="fieldset-flex">
                <div className="form-inputs">
                  {fieldset.fields?.map((field) => renderField(field))}
                </div>
                {fieldset.fields?.some((f) => f.infoText) && (
                  <div
                    className={`form-info ${
                      fieldset.fields?.some(
                        (field) =>
                          touchedFields[field.name] && formErrors[field.name]
                      )
                        ? "error"
                        : ""
                    }`}
                  >
                    <p>{getFieldsetInfo(fieldset)}</p>
                  </div>
                )}
              </div>
            </fieldset>
          );
        })}

        <button type="submit">{submitButton?.text || Send}</button>
      </form>
    </div>
  );
}
