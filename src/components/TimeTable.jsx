import * as React from 'react';
import { useLanguageStore } from '../store';

export default function TimeTable({position}) {
    const [loading, setIsLoading] = React.useState(true);
    const {language} = useLanguageStore();

    React.useEffect(() => {
        const loadTimeInfo = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `texte/locales/components/locationData/${language}.json`
                );
                
            } catch (error) {
                
            }
        }
    })

  return (
    <div className={`${position}`}>
        <p>Das ist ein kleiner Text</p>
    </div>
  )
}
