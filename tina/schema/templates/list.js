import { commonFields } from "../fields/common";
import { titleColorField } from "../fields/style/titleColor";
import { itemField } from "../fields/text/items";
import { titleField } from "../fields/text/title";
import { listStyles } from "../options";

export const listTemplate = {
  name: "list",
  label: "Liste",

  fields: [
    ...commonFields,

    titleField(),

    titleColorField,

    itemField,

    listStyles,
  ],
};
