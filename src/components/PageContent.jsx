import * as React from "react";
import PageSection from "./PageSection";

const FlexGroup = ({id, children, style})  => {
    return (
        <div id={id} className={`flex-container ${style || ""}`.trim()} style={{display:"flex", gap: "2rem"}}>
            {children}
        </div>
    )
}

export default function PageContent({pageContent}) {
    const renderSections = () => {
        const result = [];
        let currentGroup = [];
        let currentGroupId = null;

        pageContent.forEach((section, index) => {
            if (section.visible === false) return; //Nicht sichtbar

            //Wenn Neue Gruppe beginnt oder keine definiert ist
            if (section.groupId !== currentGroupId) { 

                //Gruppe abschließen
                if (currentGroup.length > 0) { 
                    result.push(
                        <FlexGroup key={`group-${currentGroupId}`} id={currentGroupId} style={currentGroup[0].groupStyle}>
                            {currentGroup.map((item, idx) => (
                                <PageSection key={`${currentGroupId}-${idx}`} section={item} />
                            ))}
                        </FlexGroup>
                    );
                    currentGroup = [];        
                }

                // keine groupId vorhanden -> direkt hinzufügen
                if (!section.groupId) {
                    result.push(<PageSection key={`single-${index}`} section={section} />);
                    return;
                }

                // Neue Gruppe initialisieren
                currentGroupId = section.groupId;

            }

            // Element zur aktuellen Gruppe hinzufügen
            if (section.groupId) {
                currentGroup.push(section);
            }

        });

        // Letzte Gruppe abschließen falls vorhanden
        if(currentGroup.length > 0) {
            result.push(
                <FlexGroup key={`group-${currentGroupId}`} id={currentGroupId} style={currentGroup[0].groupStyle}>
                    {currentGroup.map((item, idx) => (
                        <PageSection key={`${currentGroupId}-${idx}`} section={item} />
                    ))}
                </FlexGroup>
            );
        }

        return result;
    };

    return <div className="page-content">{renderSections()}</div>
}