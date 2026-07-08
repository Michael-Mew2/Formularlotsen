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
      ],
    },
  ],
};
