/**
 * 全站水合检查：确认每个页面的 React island 都真的接管了 DOM。
 * 未水合的 island 意味着页面上的组件是死的。
 */
import { Browser, sleep } from 'file:///C:/Users/bbylw/.workbuddy/skills/frontend-studio/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://localhost:4399';
const pages = [
  '/',
  '/components/',
  '/docs/introduction/',
  '/docs/accessibility/',
  '/docs/styling/',
  '/docs/state/',
  '/docs/composition/',
  '/docs/installation/',
  '/docs/community/',
];

const b = await Browser.launch();
let bad = 0;

for (const path of pages) {
  const p = await b.newPage();
  await p.goto(base + path);
  await sleep(2600);

  const r = await p.send('Runtime.evaluate', {
    expression: `(() => {
      const islands = [...document.querySelectorAll('astro-island')];
      let withReact = 0;
      for (const i of islands) {
        const el = i.querySelector('[class]') || i.querySelector('*');
        if (el && Object.keys(el).some((k) => k.startsWith('__react'))) withReact++;
      }
      // 找仍未接管的 island
      const dead = [];
      for (const i of islands) {
        const el = i.querySelector('[class]') || i.querySelector('*');
        if (!el || !Object.keys(el).some((k) => k.startsWith('__react'))) {
          dead.push(i.getAttribute('component-url')?.split('/').pop() || '?');
        }
      }
      return { total: islands.length, withReact, dead: [...new Set(dead)] };
    })()`,
    returnByValue: true,
  });

  const v = r.result?.value ?? {};
  const ok = v.total === 0 || v.withReact === v.total;
  if (!ok) bad++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${path.padEnd(26)} ${v.withReact}/${v.total} 已水合` +
      (v.dead?.length ? `  未接管: ${v.dead.join(', ')}` : ''),
  );
  await p.close();
}

console.log(bad === 0 ? '\n全部页面的 island 都已水合。' : `\n${bad} 个页面存在未水合的 island。`);
await b.close();
process.exit(bad > 0 ? 1 : 0);