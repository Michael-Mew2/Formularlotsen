import * as React from 'react';
import { useLanguageStore } from '../store';

export default function TimeTable({position}) {
    const [loading, setIsLoading] = React.useState(true);
    const [timeData, setTimeData] = React.useState(null);
    const {language} = useLanguageStore();

    React.useEffect(() => {
        const loadTimeInfo = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `texte/locales/components/locationData/${language}.json`
                );
                if(!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

                const data = await response.json();
                console.log("Daten erfolgreich geladen:", data);
                setTimeData(data.locationData)
                setIsLoading(false);
            } catch (error) {
                console.error("Fehler beim Laden der Daten", error);
                setIsLoading(false);
            }
        };

        loadTimeInfo();
    }, [language]);

    // Sortieren der Standorte nach Tag und Uhrzeit
    

  return (
    <div className={`${position}`}>
        <p>Das ist ein kleiner Text</p>
    </div>
  )
}
