import * as React from "react";
import { useLanguageStore } from "../store";

export default function ContactInfo({ section }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [personalData, setPersonalData] = React.useState(null);
  const [translationData, setTranslationData] = React.useState(null);
  const { language } = useLanguageStore();
  console.log("Contact-info-section-content:", section);
  const outerContainer = React.useRef(null);
  const title = React.useRef(null);
  const content = React.useRef(null);

  React.useEffect(() => {
    const listBox = outerContainer.current;
    const listTitle = title.current;
    const listUl = content.current;

    if (listBox && listTitle && listUl) {
      const listTitleHeight = listTitle.offsetHeight;
      // console.log(listTitleHeight);

      const additionalContentSpacing = 0;
      const additionalBoxSpacing = 0;

      listUl.style.marginTop = `${
        listTitleHeight / 2 + additionalContentSpacing
      }px`;
      listBox.style.marginTop = `${
        listTitleHeight / 2 + additionalBoxSpacing
      }px`;
    }
  }, []);

  const formatPhoneForWhatsApp = (phoneNumber) => {
    if (!phoneNumber) return "";
    const cleaned = phoneNumber.replace(/[\s-]/g, "");
    return cleaned.startsWith("0") ? `+49${cleaned.substring(1)}` : cleaned;
  };

  const formatWebsite = (website) => {
    if (!website) return "";
    console.log(`Folgende Webseite wird Formatiert ${website}`);
    
    return website
      .replace(/^https?:\/\/(www\.)?/, "")
      .replace(/^www\./, "")
      .replace(/^\/+/, "")
      .split(/[/?#]/)[0];
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `texte/locales/components/contactPeople/${language}.json`
        );
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

        const data = await response.json();
        console.log("Daten erfolgreich geladen:", data);
        setData(data);

        if (data?.contactPeople) {
          setPersonalData(data.contactPeople[section]);
        }

        if (data?.translations) {
          setTranslationData(data.translations);
        }
      } catch (error) {
        console.error(`Fehler beim laden der Datei: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [language, section]);

  console.log("Das sind die Daten:", data);
  console.log("Das sind die daten zu einer Person:", personalData);

  return (
    <div ref={outerContainer} className="contact-info-outer-container">
      <div className="contact-info-inner-container">
        <figure className="image contact-info-image peoplePortrait">
          <img src={personalData?.picture} alt={personalData?.pictureAlt} />
        </figure>
        <h3 ref={title} className="contact-info-title">
          {personalData?.showPositionAsTitle ? personalData?.position : section}
        </h3>
        <div ref={content} className="contact-info-content">
          {personalData?.showPositionAsTitle ? (
            <p className="contact-info-name">{section}</p>
          ) : (
            personalData?.position && (
              <p className="contact-info-position">{personalData?.position}</p>
            )
          )}
          {personalData?.showPositionAsTitle
            ? null
            : personalData?.organization && (
                <p className="contact-info-organization">
                  {personalData?.organization}
                </p>
              )}
          {personalData?.phone && (
            <a
              href={
                personalData?.whatsappInsteadOfTelephone
                  ? `https://wa.me/${formatPhoneForWhatsApp(
                      personalData?.phone
                    )}`
                  : `tel:${personalData?.phone}`
              }
              className="contact-info-phone"
              target="_blank"
            >
              <span>{translationData?.phone}:</span> {personalData?.phone}
            </a>
          )}
          {personalData?.eMail && (
            <a
              href={`mailto:${personalData?.eMail}`}
              className="contact-info-email"
              target="_blank"
            >
              <span>{translationData?.eMail}:</span> {personalData?.eMail}
            </a>
          )}
          {personalData?.website && (
            <a
              href={personalData?.website}
              target="_blank"
              className="contact-info-website"
            >
              <span>{translationData?.website}</span>: {formatWebsite(personalData?.website)}
            </a>
          )}
          {personalData?.whatsappButton && (
            <a
              href={`https://wa.me/${formatPhoneForWhatsApp(
                personalData?.phone
              )}`}
              className="contact-info-whatsapp"
              target="_blank"
            >
              <span>{translationData?.whatsapp}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
