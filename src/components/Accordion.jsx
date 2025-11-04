import * as React from "react";
import PageSection from "./PageSection";

const FlexGroup = ({ direction = "row", flex, children, className = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        flex: flex,
        gap: "10px",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const FlexItem = ({ flex, children, className = "" }) => {
  return (
    <div style={{ flex: flex || 1 }} className={className}>
      {children}
    </div>
  );
};

export default function Accordion({ section }) {
    console.log("Accordion section:", section);
    
  return (
    <div className={`accordion ${section.groupStyle || ""}`}>
      {section.items?.map((item, index) => (
        <div key={index} className="accordion-item">
          {item.title && <h3 className="accordion-title">{item.title}</h3>}
          <div className="accordion-content">
            {item.contentGroups?.map((group, groupIdx) => (
              <FlexGroup
                key={groupIdx}
                direction={group.direction}
                flex={group.flex}
                className={group.className}
              >
                {group.items?.map((groupItem, itemIdx) =>
                  groupItem.direction ? (
                    <FlexGroup
                      key={itemIdx}
                      direction={groupItem.direction}
                      flex={groupItem.flex}
                      className={groupItem.className}
                    >
                      {groupItem.items?.map((nestedItem, nestedIdx) => (
                        <FlexItem
                          key={nestedIdx}
                          flex={nestedItem.flex}
                          className={nestedItem.className}
                        >
                          <PageSection section={nestedItem.component} />
                        </FlexItem>
                      ))}
                    </FlexGroup>
                  ) : (
                    <FlexItem
                      key={itemIdx}
                      flex={groupItem.flex}
                      className={groupItem.className}
                    >
                      <PageSection section={groupItem.component} />
                    </FlexItem>
                  )
                )}
              </FlexGroup>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
