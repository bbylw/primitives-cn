/**
 * 静态产物断链检查：遍历 dist 里所有 HTML，
 * 验证站内页面链接、锚点与资源文件都存在。先运行 `bun run build`。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = join(process.cwd(), 'dist');

if (!existsSync(dist)) {
  console.error('找不到 dist/，先运行 `bun run build`。');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(dist);
const pages = new Map();

for (const file of files.filter((f) => f.endsWith('.html'))) {
  let route = '/' + relative(dist, file).split(sep).join('/');
  route = route.replace(/index\.html$/, '');
  pages.set(route, readFileSync(file, 'utf8'));
}

const htmlHref = /<a\b[^>]*\bhref\s*=\s*["']([^"']*)["']/gi;
const srcAttr = /<(?:img|script|source|video)\b[^>]*\bsrc\s*=\s*["']([^"']*)["']/gi;

function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}

function stripHash(href) {
  const i = href.indexOf('#');
  return i === -1 ? [href, ''] : [href.slice(0, i), href.slice(i + 1)];
}

function resolvePage(pathname) {
  if (pages.has(pathname)) return pathname;
  if (!pathname.endsWith('/') && pages.has(pathname + '/')) return pathname + '/';
  if (pages.has(pathname + '.html')) return pathname + '.html';
  return null;
}

let links = 0;
let assets = 0;
const failures = [];

for (const [route, html] of pages) {
  for (const match of html.matchAll(htmlHref)) {
    const href = decode(match[1]).trim();
    if (!href || href.startsWith('#')) continue;
    if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;

    links++;
    const [rawPath, hash] = stripHash(href);
    let pathname = rawPath;
    let targetRoute = route;

    if (pathname) {
      try {
        pathname = new URL(pathname, 'https://site.test' + route).pathname;
      } catch {
        failures.push(`${route} -> ${href}（无法解析）`);
        continue;
      }
      targetRoute = resolvePage(pathname);
      if (!targetRoute) {
        if (existsSync(join(dist, pathname.replace(/^\//, '')))) continue;
        failures.push(`${route} -> ${href}（页面不存在）`);
        continue;
      }
    }

    if (hash) {
      const id = decodeURIComponent(hash);
      const target = pages.get(targetRoute);
      const idRe = new RegExp(`\\b(?:id|name)\\s*=\\s*["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`);
      if (!idRe.test(target)) failures.push(`${route} -> ${href}（锚点不存在）`);
    }
  }

  for (const match of html.matchAll(srcAttr)) {
    const src = decode(match[1]).trim();
    if (!src || /^(https?:|data:)/i.test(src)) continue;
    assets++;
    const pathname = new URL(src, 'https://site.test' + route).pathname;
    if (!existsSync(join(dist, pathname.replace(/^\//, '')))) {
      failures.push(`${route} -> ${src}（资源不存在）`);
    }
  }
}

console.log(`检查 ${pages.size} 个页面：${links} 个站内链接、${assets} 个站内资源。`);
if (failures.length) {
  console.error(`\n${failures.length} 处断链：`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log('没有发现断链或缺失锚点。');
