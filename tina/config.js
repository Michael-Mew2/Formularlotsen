import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "",
  // Get this from tina.io
  token: "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
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
        // ----------
        // Bausteine/Felder:
        fields: [
          // Beispiel: Startseite
          {
            type: "object",
            name: "startseite",
            label: "Startseite",

            // -----
            // Meta
            fields: [
              {
                type: "object",
                name: "meta",
                label: "Meta",

                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titel",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
