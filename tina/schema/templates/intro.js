import { groupIdField } from "../fields/layout/groupId";
import { contentField } from "../fields/text/content";
import { titleField } from "../fields/text/title";

export const introTemplate = {
  name: "intro",
  label: "Intro",

  fields: [groupIdField, titleField(), contentField],

  ui: {
    defaultItem: {
      visible: true,
      position: "page-full",
      groupStyle: "page-content-title",
    },
  },
};
