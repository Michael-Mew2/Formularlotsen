import { commonFields } from "../fields/common";
import { contentColorField } from "../fields/style/contentColor";
import { titleColorField } from "../fields/style/titleColor";
import { paragraphField } from "../fields/text/paragraph";
import { titleField } from "../fields/text/title";

export const paragraphTemplate = {
  name: "paragraph",
  label: "Paragraph",

  fields: [
    ...commonFields,

    titleField(),

    titleColorField,

    paragraphField,

    contentColorField,
  ],
};
