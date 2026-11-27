import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import partytown from '@astrojs/partytown'

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://xavierkhew.com',
  // base: '/wip-website',
  // Lets Astro download and optimize Sanity images at build time
  image: { domains: ['cdn.sanity.io'] },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ]
});