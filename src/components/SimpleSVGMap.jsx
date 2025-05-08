import * as React from "react";
import SVGMap from "../assets/karte_bremerhaven.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useLanguageStore } from "../store";

export default function SimpleSVGMap() {
  const [hoveredDistrict, setHoveredDistrict] = React.useState(null);
  const [locationData, setLocationData] = React.useState(null);

  const svgRef = React.useRef(null);

  const { language } = useLanguageStore();

  React.useEffect(() => {
    const loadLocationInfo = async () => {
      try {
        const response = await fetch(
          `texte/locales/components/locationData/${language}.json`
        );
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

  const handleMouseEnter = (e) => {
    // Hole das eigentliche SVG-Element
    const svgElement = svgRef.current;
    // console.log("svgElement:", svgElement);

    if (!svgElement) return;

    // Suche das Polygon-Element
    const polygon = svgElement.querySelector(`polygon, path`);
    // console.log("Polygon:", polygon);

    if (polygon) {
      setHoveredDistrict(polygon.id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
  };

  // Funktion zum Finden der Pin-Position
  const getPinPosition = (districtId) => {
    if (!locationData) return { x: 0, y: 0 };
    console.log("LocationData:", locationData);
    console.log("districtId:", districtId);

    const district = locationData.find(
      (d) => d.borough.toLowerCase() === districtId.toLowerCase()
    );

    console.log("District:", district);

    return district ? district.pinPosition : { x: 0, y: 0 };
  };

  return (
    <div className="svgCityMap">
      <svg viewBox="-1 -1 220 349">
        <polygon
          id="Weddewarden"
          className="stadtteil"
          points="93.3,64.8 89.2,64.7 87.8,65.8 87.1,67.7 64.1,60.3 56.2,42.7 55.8,37.8 58.3,32.9 
			58.2,31.4 54.2,25.5 53,24.8 49.9,24.8 48.5,25.8 46.6,30.6 43.1,30.7 42,31.3 32.6,43.1 11.8,15.9 14,14.3 14.5,12.3 13.4,10.6 
			18.9,8.5 28.9,6.8 32.5,12 34.6,12.3 36.3,11.2 40.6,11.5 45.5,13.2 47.4,12.1 48.7,7.2 75.4,17.7 70,25.9 69.7,26.7 69.4,45.1 
			70,46.4 73.8,49 74.3,49.2 80.7,51 90.7,55.7 		"
          onMouseEnter={() => setHoveredDistrict("Weddewarden")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Lehe"
          className="stadtteil"
          points="175,127.8 173,131.7 167,136.4 
			166.7,136.6 161.1,143.4 152.3,146.6 139,139.4 138.2,139.2 122.2,139.7 117.5,137.4 116.3,137.3 111.8,139.1 110.9,140.4 
			110.4,145.4 110.7,146.4 112.7,148.9 113.9,149.5 116.9,149.4 117.9,148.9 119.4,147.4 120.4,147.5 122.9,154.6 121.9,155.4 
			120.5,154.9 119.7,152.8 119,152 116,150.6 115,150.5 112.2,151.3 111.5,151.8 110.4,153.1 108.5,151.4 108.3,149.3 110.6,142.7 
			110.3,141.2 108.9,139.5 107.7,139.3 98.2,120.5 97,119.6 90.6,119.1 93.9,116.7 94.5,115.8 104.6,75.6 103.6,73.8 101.6,73.1 
			96.7,65.7 93.3,54.2 92.5,53.3 81.8,48.2 81.6,48.2 75.3,46.5 72.4,44.4 72.7,27.2 78.8,18.1 79.7,17.5 81.9,19.9 82.5,20.3 
			108.5,29.6 108.5,32 110,33.5 114.1,33.4 114.1,34.8 115.1,36.2 121.7,38.6 121.8,39.8 121.9,40 129.5,62.1 131,63.1 144.8,62.5 
			149.5,67.4 150.1,67.8 165.1,73 160.1,87.5 160.2,88.7 167.2,102.6 		"
          onMouseEnter={() => setHoveredDistrict("Lehe")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Leherheide"
          className="stadtteil"
          points="215.1,5.7 214.2,9.9 214.1,9.9 212.4,11.4 212.5,15.8 209.6,15.7 208.5,16.1 
			188.1,34.7 187.8,36.5 190.1,40.5 166.5,70.3 151.4,65.1 146.5,60 145.4,59.5 132,60.1 125.4,41 127.6,40.9 128.2,40.8 
			136.8,36.6 137.4,36.1 148.5,20.7 168.7,11.5 172.3,13.1 172.8,13.2 178.3,13.3 186.6,17.3 187.1,17.4 192.1,17.9 193.6,21.1 
			195.7,21.7 201,18.6 201.7,17.5 202.2,13.7 201,12.1 197.3,11.4 198.5,5 197.9,3.5 195.6,1.8 196.1,0 200.2,0 205.4,1.9 
			205.4,4.1 206.9,5.6 211.6,5.5 212.4,4.6 213.4,5.6 		"
          onMouseEnter={() => setHoveredDistrict("Leherheide")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Mitte"
          className="stadtteil"
          points="115.8,163.3 115.8,168.2 114.8,172.7 107.3,179.6 106.5,179.6 105.9,179.8 103,181.1 
			104.8,176.8 104.9,175.9 103.2,168.4 102.7,167.5 95.8,162.6 91.9,156.2 92.5,153.1 92,151.8 86.9,147 95.6,144.3 96.4,142.2 
			87.1,125.5 87.8,121.8 96,122.5 105.5,141.7 107.2,142.1 107.5,142.5 105.4,148.6 105.3,149.2 105.6,152.3 106.1,153.3 
			108.4,155.3 108.2,155.5 108.4,157.6 110.8,159.8 111.8,160.2 112.3,160.2 114.2,161.9 114.3,161.9 		"
          onMouseEnter={() => setHoveredDistrict("Mitte")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <path
          id="Geestemünde"
          className="stadtteil"
          d="M172.7,246.1l-6.7,5.3l-4.9,1.8l-5.3-0.7l-12.4-11.9l-5.5-6.9l-0.4-6.5l-1.4-1.4l-5.3-0.3
			l-5.8-3.1l-3.1-3.1V212l-0.2-0.6c-2.3-4.9-8.1-24-8.2-24.2l-2.6-0.5l-5.4,6.6l-3.9,0.7V185l5.2-2.4h1.1l1-0.4l8.2-7.7l0.4-0.8
			l1.2-5.1v-0.3v-5.7l-0.5-1.1l-4.4-4l-1-0.4h-0.6l-0.9-0.9l2-2.3l1.8-0.5l1.9,0.9l0.8,2.2l0.9,0.9l2.8,1.1l1.5-0.2l2.4-2l0.4-1.6
			l-3.1-9l-1.2-1l-2.7-0.4l-1.3,0.4l-1.6,1.7l-1.7,0.1l-1.1-1.4l0.3-3.5l3-1.2l4.4,2.2l0.7,0.2l16-0.4l13.6,7.3l1.2,0.1l7.8-2.8
			v20.3v0.2l6.1,39.2l3.2,17.7l2.6,14.9L172.7,246.1z"
          onMouseEnter={() => setHoveredDistrict("Geestemünde")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Schiffdorferdamm"
          className="stadtteil"
          points="194.9,148.5 195.8,168.4 192.7,167.3 190.7,168.6 189.6,180.6 186.2,183.8 
			185.7,184.9 186.4,198.4 186.4,198.6 187.4,204.9 169.3,204.9 163.4,167.1 163.4,145.2 168.9,138.6 174.4,134.4 184.8,140 
			186.1,140.1 192.3,137.5 197,135.8 194.9,148.1 		"
          onMouseEnter={() => setHoveredDistrict("Schiffdorferdamm")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <path
          id="Fischerreihafen"
          className="stadtteil"
          d="M136.5,298.4v8l-6-1.5h-0.9l-6.6,2.3l-0.4,1.6l-8-3.6h-1.2l-6.6,2.8l-2.9-1.6l-3.4-5
			h-2.4l-1.2,1.6c-4.1,1.7-39,16-45.2,17.5c-1.6,0.1-11.8,0.6-13.9,0.7l-1.1,0.5c-5.2,6.2-12.7,15-15.4,17.8
			c-0.2-0.3-0.3-0.7-0.5-0.9c-1-1.9-1.5-3-2.7-3h-0.3h-0.7c-2.1,0-6.7-0.1-6.7-0.1l-1.3,0.7l-5.7,8.8L0,344.5l6.2-26.8l4.4-11.9
			l1.8-6l3-2.5l0.5-1l0.7-5.9l5.3-11.3l8-5.9l25-9.5l0.9-1l0.4-1.4l14.8-4.3l2.3-0.3l0.7-0.3l10.7-7.6l0.6-1.3l-0.2-4.6l2.4-2.2
			l0.3-0.4l7-13l0.1-0.3l3.2-12.6l3.2-17.7l5.2-0.9l0.9-0.5l4-4.8c1.7,5.4,5.4,17.4,7.4,21.6v7.3l-1.2,7.4v0.6l5.2,23.1l-0.4,6.4
			v0.5l7,29.9l0.2,0.5L136.5,298.4z"
          onMouseEnter={() => setHoveredDistrict("Fischerreihafen")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Wulsdorf"
          className="stadtteil"
          points="174,276.2 173.7,279.5 172.5,278.8 170.3,280.1 170.3,283.6 168.5,283.6 158.6,293.1 
			148.3,299.4 139.5,301.9 139.5,297.9 139.2,297.1 132.4,286.6 125.5,257.1 125.9,250.7 125.9,250.3 120.7,227.3 121.4,222.8 
			123.1,224.5 123.4,224.8 129.7,228.2 130.3,228.4 134.6,228.6 134.9,234.2 135.2,235.1 141.1,242.5 141.2,242.6 154.1,254.9 
			154.9,255.4 161,256.1 161.7,256 167.2,254.1 167.6,253.8 172.7,249.9 172.5,268 171.7,269.1 171.5,270.6 		"
          onMouseEnter={() => setHoveredDistrict("Wulsdorf")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
        <polygon
          id="Surheide"
          className="stadtteil"
          points="199.9,236.8 202.9,244 200,246.8 196.1,246.8 195.2,247.1 184.5,255.4 183.9,257 
			186.2,264.5 181.2,268.9 175.4,267.4 175.7,246.8 175.4,238.9 175.4,238.7 172.7,223.8 169.8,207.9 187.7,207.9 187.7,209.4 
			188.2,210.5 194.4,215.3 195.6,224.7 197.5,225.9 201.7,224.6 204.5,231.8 200.3,235 		"
          onMouseEnter={() => setHoveredDistrict("Surheide")}
          onMouseLeave={() => setHoveredDistrict(null)}
        />
      </svg>
      {hoveredDistrict && locationData && (
        <FontAwesomeIcon
          icon={faMapPin}
          style={{
            position: "absolute",
            left: `${getPinPosition(hoveredDistrict).x}`,
            top: `${getPinPosition(hoveredDistrict).y}`,
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            color: "red",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
