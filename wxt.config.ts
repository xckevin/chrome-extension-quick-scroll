import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  outDir: "dist",
  manifest: {
    default_locale: "en",
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    version: "1.0.1",
    author: "liukai",
    permissions: ["storage"],
  },
});
