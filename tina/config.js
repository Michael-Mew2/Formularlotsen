import { defineConfig, defineSchema } from "tinacms";

export default defineConfig({
  schema: defineSchema({
    collections: [
      {
        label: "Seiteninhalte",
        name: "page_content",
        path: "public/texte/locales/pages",
        fields: [
          {
            label: "Seiten-Name",
            name: "page_name",
            type: "string",
            required: true,
          },
          {
            label: "Meta-Daten",
            name: "meta",
            type: "object",
            fields: [
              { label: "Titel", name: "title", type: "string" },
              { label: "Beschreibung", name: "content", type: "string" },
            ],
          },
          {
            label: "Hero-Bereich",
            // description:
            //   "Das erste was die Besucher sehen, wenn diese die Seite öffnen.",
            name: "hero",
            type: "object",
            fields: [
              { label: "Bild", name: "heroPicture", type: "image" },
              { label: "Alt-Text", name: "heroPictureAlt", type: "string" },
              { label: "Haupttitel", name: "heroMainTitle", type: "string" },
              { label: "Untertitel", name: "heroSubTitle", type: "string" },
            ],
          },
          {
            label: "Inhaltsblöcke",
            name: "pageContent",
            type: "object",
            list: "true",
            fields: [
              {
                label: "Typ",
                name: "type",
                type: "string",
                options: [
                  "intro",
                  "list",
                  "paragraph",
                  "image",
                  "table",
                  "svg-map",
                  "city-map",
                  "time-table",
                  "accordion",
                  "accordion-address",
                  "accordion-contact",
                  "accordion-times",
                  "contact-form",
                  "legal-checkbox",
                  "contact-info",
                  "loading-wave",
                  "divider",
                ],
              },
              { label: "Gruppen-ID", name: "groupId", type: "string" },
              {
                label: "Gruppen-Stil",
                name: "groupStyle",
                type: "string",
                list: "true",
                options: [
                  { label: "Eine Spalte", name: "full-width" },
                  { label: "Zwei Spalten", name: "flex-two-columns" },
                ],
              },
              {
                label: "Position",
                name: "position",
                type: "string",
                list: "true",
                options: [
                  { label: "Links", name: "flex-item-left" },
                  { label: "Rechts", name: "flex-item-right" },
                  { label: "Ganze Breite", name: "page-full" },
                ],
              },
            ],
          },
        ],
      },
    ],
  }),
});
