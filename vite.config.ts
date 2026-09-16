import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Inlines the emitted CSS into index.html to eliminate render-blocking requests
const inlineCss = (): Plugin => ({
  name: "inline-css",
  apply: "build",
  enforce: "post",
  generateBundle(_, bundle) {
    const html = bundle["index.html"];
    if (!html || html.type !== "asset" || typeof html.source !== "string") return;
    for (const fileName of Object.keys(bundle)) {
      if (!fileName.endsWith(".css")) continue;
      const css = bundle[fileName];
      if (css.type !== "asset") continue;
      const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const linkPattern = new RegExp(`<link[^>]*href="/${escaped}"[^>]*>\\s*`);
      if (linkPattern.test(html.source)) {
        html.source = html.source.replace(linkPattern, () => `<style>${css.source}</style>`);
        delete bundle[fileName];
      }
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), inlineCss(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
