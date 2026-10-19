// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import radixDark from './src/lib/shiki-theme.mjs';

// 部署时传入站点地址，例如 SITE_URL=https://example.com bun run build。
// 未设置时本地构建仍可用，但不会生成 canonical 与 sitemap。
const site = process.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), ...(site ? [sitemap()] : [])],
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