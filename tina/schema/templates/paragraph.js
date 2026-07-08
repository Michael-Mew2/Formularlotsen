import { commonFields } from "../fields/common";
import { contentColors, titleColors } from "../options/colors";

export const paragraphTemplate = {
  name: "paragraph",
  label: "Paragraph",

  fields: [
    ...commonFields,

    {
      type: "string",
      name: "title",
      label: "Überschrift",
    },

    {
      type: "string",
      name: "titleColor",
      label: "Farbe der Überschrift",
      ui: {
        component: "select",
      },
      options: titleColors,
    },

    {
      type: "string",
      name: "contentColor",
      label: "Textfarbe",
      ui: { component: "select" },
      options: contentColors,
    },

    {
      type: "string",
      list: true,
      name: "content",
      label: "Absätze",
    },
  ],
};
