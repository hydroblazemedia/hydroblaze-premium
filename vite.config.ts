import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mcpPlugin(),
    command === "build" && process.env.PRERENDER !== "false" && prerender({
      routes: ["/", "/services", "/portfolio", "/about", "/blog", "/privacy-policy"],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        renderAfterTime: 2500,
        headless: true,
        maxConcurrentRoutes: 2,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
