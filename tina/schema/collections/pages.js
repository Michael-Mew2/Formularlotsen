import { imageTemplate } from "../templates/image";
import { introTemplate } from "../templates/intro";
import { paragraphTemplate } from "../templates/paragraph";

export const pageCollection = {
  name: "startseite",
  label: "Startseite",

  path: "public/texte/locales/pages/startseite",

  format: "json",

  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },

  fields: [
    {
      type: "object",
      name: "startseite",
      label: "Startseite",

      fields: [
        {
          type: "object",
          name: "meta",
          label: "Metadaten für Suchmaschienen",

          fields: [
            {
              type: "string",
              name: "title",
              label: "Seitentitel",
            },
          ],
        },
        {
          type: "object",
          name: "pageContent",
          label: "Seiteninhalt",
          list: true,
          templates: [paragraphTemplate, introTemplate, imageTemplate],
        },
      ],
    },
  ],
};
