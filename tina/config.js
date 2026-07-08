import { defineConfig } from "tinacms";
import { pageCollection } from "./schema/collections/pages";
import { componentCollection } from "./schema/collections/componens";

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
    collections: [pageCollection, componentCollection],
  },
});
