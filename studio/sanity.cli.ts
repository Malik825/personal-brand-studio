import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "wcfopvjq",
    dataset: "production",
  },
  deployment: {
    autoUpdates: true,
  },
});
