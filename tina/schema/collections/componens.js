export const componentCollection = {
  name: "components",
  label: "Komponenten",
  path: "public/texte/locales/components",
  format: "json",

  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },

  fields: [
    // temporäre Felder
    {
      type: "object",
      name: "buttons",
      label: "Knöpfe",

      fields: [
        {
          type: "object",
          name: "openMenuButton",
          label: "Menü-öffnen-Knopf",

          fields: [
            {
              type: "string",
              name: "name",
              label: "Knopf-Name",
            },
          ],
        },
      ],
    },
  ],
};
