// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import radixDark from './src/lib/shiki-theme.mjs';
// https://astro.build/config
export default defineConfig({
  site: 'https://radix-primitives-cn.example.com',
  trailingSlash: 'ignore',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: radixDark,
      wrap: true,
    },
  },
});