import {defineManifest} from "@crxjs/vite-plugin";
import packageJson from "../package.json";

export const PORT = 27182

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  // options_page: "src/pages/options/index.html",
  permissions: [
    "nativeMessaging",
    "webRequest",
    "tabs",
    "activeTab",
    "declarativeNetRequest",
    "notifications"
  ],
  background: {
    service_worker: "src/pages/background/index.ts"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
  },
  host_permissions: [
    "*://*/*", "https://*/*", `http://localhost:${PORT}/*`, "<all_urls>"
  ],
  icons: {
    128: "icons/128x128.png",
  },
  content_scripts: [
    {
      matches: ["*://*/*", "https://*/*", `http://localhost:${PORT}/*`, "<all_urls>"],
      js: ["src/pages/content/index.tsx"],
    },
  ],
  // devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
}));

export default manifest;
