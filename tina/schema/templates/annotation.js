import { commonFields } from "../fields/common";
import { annotationStyleField } from "../fields/style/annotationStyle";
import { contentField } from "../fields/text/content";
import { titleField } from "../fields/text/title";

export const annotationTemplate = {
  label: "Zusatzinformationen",
  name: "annotation",

  fields: [...commonFields, titleField(), annotationStyleField, contentField],
};
