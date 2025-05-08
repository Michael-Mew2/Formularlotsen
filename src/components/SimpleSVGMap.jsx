import * as React from 'react';
import SVGMap from "../assets/karte_bremerhaven.svg?react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useLanguageStore } from '../store';



export default function SimpleSVGMap() {
    const [hoveredDistrict, setHoveredDistrict] = React.useState(null);

    const [locationData, setLocationData] = React.useState(null)

    const {language} = useLanguageStore();

    React.useEffect(() => {
        const loadLocationInfo = async () => {
            try {
                const response = await fetch(`texte/locales/components/locationData/${language}.json`);
                if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

                const data = await response.json();
                setLocationData(data.locationData.data.locations);
                console.log("Daten erfolgreich geladen:", data);
            } catch (error) {
                console.error(`Fehler beim Laden der Daten:`, error);
            }
        };

        loadLocationInfo();
    }, [language]);
    
    const handleMouseEnter = (districtId) => {
        setHoveredDistrict(districtId)
    }

    const handleMouseLeave = () => {
        setHoveredDistrict(null)
    }

     // Funktion zum Finden der Pin-Position
     const getPinPosition = (districtId) => {
        console.log(districtId);
        
        if (!locationData) return { x: 0, y: 0 };

        const district = locationData.find(d => d.borough === districtId);
        console.log(district);
        
        return district ? district.pinPosition : { x: 0, y: 0 };
    };

  return (
    <div className='svgCityMap'>
        <SVGMap
        onMouseEnter={(e) => handleMouseEnter(e.target.id)}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredDistrict && locationData && (
                <FontAwesomeIcon
                    icon={faMapPin}
                    style={{
                        position: 'absolute',
                        left: `${getPinPosition(hoveredDistrict).x}px`,
                        top: `${getPinPosition(hoveredDistrict).y}px`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: '24px',
                        color: 'red',
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                />
            )}
       
    </div>
  )
}
