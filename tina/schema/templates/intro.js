import { commonFields } from "../fields/common";
import { contentColorField } from "../fields/style/contentColor";
import { titleColorField } from "../fields/style/titleColor";
import { contentField } from "../fields/text/content";
import { titleField } from "../fields/text/title";

export const introTemplate = {
  name: "intro",
  label: "Intro",

  fields: [
    ...commonFields,

    titleField(),

    titleColorField,

    contentField,

    contentColorField,
  ],
};
