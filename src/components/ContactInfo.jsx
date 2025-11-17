import * as React from "react";
import { useLanguageStore } from "../store";

export default function ContactInfo({ section }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [personalData, setPersonalData] = React.useState(null);
  const [translationData, setTranslationData] = React.useState(null);
  const { language } = useLanguageStore();
  console.log("Contact-info-section-content:", section);

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
    <div className="contact-info-container">
        <figure className="image">
            <img src={personalData?.picture} alt={personalData?.pictureAlt} />
        </figure>
      <h3 className="contact-info-title">{section}</h3>
      <p className="contact-info-content">{section}</p>
    </div>
  );
}
