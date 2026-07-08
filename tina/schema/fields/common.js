export const commonFields = [
  {
    type: "boolean",
    name: "visible",
    label: "Sichtbar",
    description: "Legt fest, ob diese Komponente angezeigt wird.",
  },
  {
    type: "string",
    name: "groupId",
    label: "Gruppen-ID",
    description:
      "Elemente mit derselben Gruppen-ID werden gemeinsam dargestellt.",
  },
  {
    type: "string",
    name: "groupStyle",
    label: "Gruppenlayout",
    options: [
      {
        label: "Zweispaltig",
        value: "flex-two-columns",
      },
      {
        label: "Volle Breite",
        value: "full-width",
      },
      {
        label: "Seitentitel",
        value: "page-content-title",
      },
    ],
  },
  {
    type: "string",
    name: "position",
    label: "Position",
    options: [
      {
        label: "Links",
        value: "flex-item-left",
      },
      {
        label: "Rechts",
        value: "flex-item-right",
      },
      {
        label: "Volle Breite",
        value: "page-full",
      },
    ],
  },
];
