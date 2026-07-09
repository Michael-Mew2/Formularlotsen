import { commonFields } from "../fields/common";
import { listStyleField } from "../fields/style/listStyle";
import { titleColorField } from "../fields/style/titleColor";
import { itemField } from "../fields/text/items";
import { titleField } from "../fields/text/title";

export const listTemplate = {
  name: "list",
  label: "Liste",

  fields: [
    ...commonFields,

    titleField(),

    titleColorField,

    itemField,

    listStyleField,
  ],
};
