/**
 * 交互自检（v4）：验证「组件真的能用」这一核心主张。
 * 1) hero：Switch 翻转 + Tabs 切换
 * 2) DemoGrid：Slider 键盘、RadioGroup、Progress 步进、Tabs
 * 3) 组件页：Playground 的 Switch 可切换
 * 4) 文档页：DocDemo 的 Switch 翻转且属性表更新
 */
import { Browser, sleep } from 'file:///C:/Users/bbylw/.workbuddy/skills/frontend-studio/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://localhost:4399';
const b = await Browser.launch();
let pass = 0, fail = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`);
  ok ? pass++ : fail++;
};
const evalJs = async (page, expr) => {
  const r = await page.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
const pointerClick = (page, sel) => evalJs(page, `(() => {
  const el = document.querySelector('${sel}');
  if (!el) return null;
  el.scrollIntoView({block:'center'});
  const r = el.getBoundingClientRect();
  const opts = { bubbles:true, cancelable:true, clientX:r.left+r.width/2, clientY:r.top+r.height/2, button:0, pointerId:1, pointerType:'mouse', isPrimary:true };
  el.dispatchEvent(new PointerEvent('pointerdown', opts));
  el.dispatchEvent(new MouseEvent('click', opts));
  return true;
})()`);

/* ---------- 1. 首页 hero ---------- */
{
  const p = await b.newPage();
  await p.goto(base + '/');
  await sleep(2600);

  const before = await evalJs(p, `document.querySelector('.hero-side [role="switch"]')?.getAttribute('aria-checked')`);
  await pointerClick(p, '.hero-side [role="switch"]');
  await sleep(300);
  const after = await evalJs(p, `document.querySelector('.hero-side [role="switch"]')?.getAttribute('aria-checked')`);
  check('hero Switch 可切换', before !== null && before !== after, `${before} -> ${after}`);

  const tabBefore = await evalJs(p, `document.querySelector('.hero-side [role="tab"][aria-selected="true"]')?.textContent`);
  /* Radix Tabs 激活在 onMouseDown（要求 button===0 且非 ctrl），合成 click 不触发 */
  await evalJs(p, `(() => { const t = document.querySelectorAll('.hero-side [role="tab"]')[1]; t?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, ctrlKey: false })); })()`);
  await sleep(400);
  const tabAfter = await evalJs(p, `document.querySelector('.hero-side [role="tab"][aria-selected="true"]')?.textContent`);
  check('hero Tabs 可切换', tabBefore !== tabAfter, `${tabBefore} -> ${tabAfter}`);
  await p.close();
}

/* ---------- 2. DemoGrid ---------- */
{
  const p = await b.newPage();
  await p.goto(base + '/');
  await sleep(2600);

  // Slider：键盘方向键
  const svBefore = await evalJs(p, `document.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')`);
  await evalJs(p, `document.querySelector('[role="slider"]')?.focus()`);
  await p.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
  await p.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
  await sleep(300);
  const svAfter = await evalJs(p, `document.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')`);
  check('DemoGrid Slider 支持方向键', svBefore !== null && svBefore !== svAfter, `${svBefore} -> ${svAfter}`);

  // Progress：+12
  const pvBefore = await evalJs(p, `document.querySelector('.dg-prog-row b')?.textContent`);
  await pointerClick(p, '.dg-step:nth-child(2)');
  await sleep(300);
  const pvAfter = await evalJs(p, `document.querySelector('.dg-prog-row b')?.textContent`);
  check('DemoGrid Progress 可步进', pvBefore !== pvAfter, `${pvBefore} -> ${pvAfter}`);

  // Tabs（wide 卡）
  const tb = await evalJs(p, `document.querySelector('.demo-grid .px-tabs [role="tab"][aria-selected="true"]')?.textContent`);
  await evalJs(p, `(() => { const t = document.querySelectorAll('.demo-grid .px-tabs [role="tab"]')[2]; t?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, ctrlKey: false })); })()`);
  await sleep(400);
  const ta = await evalJs(p, `document.querySelector('.demo-grid .px-tabs [role="tab"][aria-selected="true"]')?.textContent`);
  check('DemoGrid Tabs 可切换', tb !== ta, `${tb} -> ${ta}`);

  // RadioGroup
  const rb = await evalJs(p, `[...document.querySelectorAll('#dg-radio [role="radio"]')].findIndex(x=>x.getAttribute('aria-checked')==='true')`);
  await pointerClick(p, '#dg-radio [role="radio"]');
  await sleep(250);
  const ra = await evalJs(p, `[...document.querySelectorAll('#dg-radio [role="radio"]')].findIndex(x=>x.getAttribute('aria-checked')==='true')`);
  check('DemoGrid RadioGroup 可选', rb >= 0 && rb !== ra, `idx ${rb} -> ${ra}`);
  await p.close();
}

/* ---------- 3. 组件页 Playground ---------- */
{
  const p = await b.newPage();
  await p.goto(base + '/components/');
  await sleep(3000);
  const before = await evalJs(p, `document.querySelector('.px-playground [role="switch"]')?.getAttribute('aria-checked')`);
  await pointerClick(p, '.px-playground [role="switch"]');
  await sleep(300);
  const after = await evalJs(p, `document.querySelector('.px-playground [role="switch"]')?.getAttribute('aria-checked')`);
  check('组件页 Switch 可切换', before !== null && before !== after, `${before} -> ${after}`);
  const role = await evalJs(p, `document.querySelector('.px-playground [role="switch"]')?.getAttribute('role')`);
  check('组件页 Switch 有真实 role', role === 'switch', role);
  await p.close();
}

/* ---------- 4. 文档页 DocDemo ---------- */
{
  const p = await b.newPage();
  await p.goto(base + '/docs/styling/');
  await sleep(2600);
  const before = await evalJs(p, `document.querySelector('.doc-demo [aria-label="自动更新"]')?.getAttribute('aria-checked')`);
  const rowBefore = await evalJs(p, `document.querySelector('.doc-demo .px-row > code')?.textContent`);
  await pointerClick(p, '.doc-demo [role="switch"]');
  await sleep(300);
  const after = await evalJs(p, `document.querySelector('.doc-demo [aria-label="自动更新"]')?.getAttribute('aria-checked')`);
  const rowAfter = await evalJs(p, `document.querySelector('.doc-demo .px-row > code')?.textContent`);
  check('文档页 Switch 可切换', before !== null && before !== after, `${before} -> ${after}`);
  check('文档页属性表同步更新', rowBefore !== rowAfter, `${rowBefore} -> ${rowAfter}`);
  await p.close();
}

console.log(`\n通过 ${pass} / 失败 ${fail}`);
await b.close();
process.exit(fail > 0 ? 1 : 0);