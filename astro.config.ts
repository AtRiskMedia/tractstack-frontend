import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  image: {
    domains: ["tractstack.com", "atriskmedia.com"],
  },
  site: SITE.website,
  integrations: [tailwind(), react(), sitemap()],
  scopedStyleStrategy: "where",
});
