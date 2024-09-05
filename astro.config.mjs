import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import partytown from '@astrojs/partytown'

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://xavierkhew.com',
  // base: '/wip-website',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ]
});