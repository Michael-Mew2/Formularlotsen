import { commonFields } from "../fields/common";
import { contentField } from "../fields/text/content";
import { titleField } from "../fields/text/title";

export const introTemplate = {
  name: "intro",
  label: "Intro",

  fields: [...commonFields, titleField(), contentField],
};
