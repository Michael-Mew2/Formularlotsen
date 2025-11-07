import * as React from "react";
import PageSection from "./PageSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlexGroup = ({ direction = "row", flex, children, className = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        flex: flex,
        gap: "2rem",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const FlexItem = ({ flex, children, className = "" }) => {
  return (
    <div /* style={{ flex: flex || 1 }} */ className={className}>
      {children}
    </div>
  );
};

export default function Accordion({ section }) {
  const [openIndex, setOpenIndex] = React.useState(-1);

  const toggleAccordion = (index) =>
    setOpenIndex(index === openIndex ? -1 : index);

  console.log("Accordion section:", section);

  return (
    <div className={`accordion ${section.groupStyle || ""}`}>
      {section.items?.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndex === index ? "open" : ""}`}
        >
          {item.title && (
            <div
              className={`accordion-title ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleAccordion(index)}
              style={{ cursor: "pointer" }}
            >
              <h3>{item.title}</h3>
              <FontAwesomeIcon className={`accordion-icon ${openIndex === index ? "open" : ""}`} icon="fa-solid fa-play" />
            </div>
          )}
          {/* {openIndex === index && ( */}
            <div className="accordion-content">
              {item.contentGroups?.map((group, groupIdx) => (
                <FlexGroup
                  key={groupIdx}
                  direction={group.direction}
                  flex={group.flex}
                  className={group.direction}
                >
                  {group.items?.map((groupItem, itemIdx) =>
                    groupItem.direction ? (
                      <FlexGroup
                        key={itemIdx}
                        direction={groupItem.direction}
                        flex={groupItem.flex}
                        className={groupItem.direction}
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
          {/* )} */}
        </div>
      ))}
    </div>
  );
}
