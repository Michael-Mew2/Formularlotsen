import { groupStyles } from "../../options";

export const createGroupStyleField = (defaultValue = "") => ({
  type: "string",
  name: "groupStyle",
  label: "Gruppenlayout",
  options: groupStyles,

  ui: { defaultValue },
});
