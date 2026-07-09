import * as React from "react";
import GridTable from "./GridTable";
import Annotation from "./Annotation";
import Pictures from "./Pictures";
import List from "./List";
import Paragraph from "./Paragraph";
import PageContent from "./PageContent";
import SimpleSVGMap from "./SimpleSVGMap";
import BremerhavenMap from "./BremerhavenMap";
import TimeTable from "./TimeTable";
import Accordion from "./Accordion";
import AccAddress from "./AccAddress";
import AccTimes from "./AccTimes";
import AccContact from "./AccContact";
import ContactForm from "./ContactForm";
import LegalCheckbox from "./LegalCheckbox";
import ContactInfo from "./ContactInfo";
import WaveLoader from "./WaveLoader";
import Divider from "./Divider";

export default function PageSection({ section }) {
  if (!section.visible && section.visible !== undefined) return null;

  const componentType = section._template ?? section.type;

  switch (componentType) {
    case "intro":
      return (
        <div className={(componentType || "intro", "page-content-title")}>
          {section.title && <h3>{section.title}</h3>}

          {section.content?.isArray ? (
            section.content?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{section.content}</p>
          )}
        </div>
      );

    case "paragraph":
      return (
        <Paragraph
          type={componentType}
          position={section.position}
          title={section.title}
          content={section.content}
          titleColor={section.titleColor}
          contentColor={section.contentColor}
          subParagraphs={section.subParagraphs}
        />
      );

    case "list":
      return (
        <List
          type={componentType}
          position={section.position}
          titleColor={section.titleColor}
          title={section.title}
          listStyle={section.listStyle}
          items={section.items}
        />
      );

    case "annotation":
      return (
        <Annotation
          type={componentType}
          annotationStyle={section.position}
          annotationType={section.annotationType}
          content={section.content}
        />
      );

    case "image":
      return (
        <Pictures
          type={componentType}
          position={section.position}
          picture={section.picture}
          alt={section.alt}
          description={section.description}
          imageType={section.imageType}
        />
      );

    case "table":
      return <GridTable data={section.data} title={section.title} />;

    case "svg-map":
      return <SimpleSVGMap />;

    case "city-map":
      return <BremerhavenMap position={section.position} />;

    case "time-table":
      return <TimeTable position={section.position} />;

    case "accordion":
      return <Accordion section={section} />;

    case "accordion-address":
      return <AccAddress content={section.content} />;

    case "accordion-contact":
      return <AccContact contactData={section.content} />;

    case "accordion-times":
      return <AccTimes openingTimes={section.content} />;

    case "contact-form":
      return (
        <ContactForm
          title={section.title}
          showTitle={section.showTitle}
          fieldsets={section.fieldsets}
          items={section.items}
          submitButton={section.submitButton}
        />
      );

    case "legal-checkbox":
      return (
        <LegalCheckbox
          section={section}
          onValidationChange={section.onValidationChange}
          onValueChange={section.onValueChange}
        />
      );

    case "contact-info":
      return <ContactInfo section={section.contactPerson} />;

    case "loading-wave":
      return <WaveLoader color={section.color} />;

    case "divider":
      return <Divider color={section.color} thickness={section.thickness} />;

    default:
      return null;
  }
}
