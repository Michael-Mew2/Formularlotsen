import { commonFields } from "../fields/common";
import { altField } from "../fields/image/alt";
import { pictureField } from "../fields/image/picture";
import { descriptionField } from "../fields/text/description";

export const imageTemplate = {
  name: "image",
  label: "Bild",

  fields: [...commonFields, pictureField, altField, descriptionField],
};
