import { titleColors } from "../../options";

export const titleColorField = {
  type: "string",
  name: "titleColor",
  label: "Farbe der Überschrift",
  ui: {
    component: "select",
  },
  options: titleColors,
};
