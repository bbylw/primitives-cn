/**
 * 从已安装的 radix-ui 与各 @radix-ui/react-* 包的类型定义中，
 * 抽取每个组件真实的公开部件（part）清单，生成 src/data/parts.json。
 *
 * 权威来源是每个包自己的 export 语句—— 那才是它的公开 API，
 * 而不是文件内部的 interface（那些含未导出的内部实现类型）。
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const radixDir = join(root, 'node_modules', '@radix-ui');

/** 聚合包导出的实验组件，不属于稳定 API */
const UNSTABLE = /^(unstable_|unstable)/;
/** 非部件：导出但不是 UI 部件的东西 */
const NOT_A_PART = new Set([
  'ImageLoadingStatus',
  'WarningProvider',
  'VISUALLY_HIDDEN_STYLES',
  'Slottable',
]);

/** 权威清单：radix-ui 聚合包导出的稳定组件 -> 对应的 npm 包 */
const AGG = join(root, 'node_modules', 'radix-ui', 'dist', 'index.d.mts');

function publicExports(dtsPath) {
  const src = readFileSync(dtsPath, 'utf8');
  const names = new Set();
  // `export { A, B as C }` —— 同一行可能有多组
  for (const line of src.split('\n')) {
    if (!/^\s*export\s*\{/.test(line)) continue;
    const inner = line.slice(line.indexOf('{') + 1, line.lastIndexOf('}'));
    for (const seg of inner.split(',')) {
      const t = seg.trim().replace(/^type\s+/, '');
      if (!t) continue;
      const parts = t.split(/\s+as\s+/);
      const name = (parts[1] ?? parts[0]).trim();
      if (name && /^[A-Z]/.test(name)) names.add(name);
    }
  }
  return names;
}

const aggSrc = readFileSync(AGG, 'utf8');
const aggModToExport = new Map();
{
  // 聚合包里是「先 import 一个命名空间，再单独 export { ns as Name }」两行一组
  const lines = aggSrc.split('\n').map((l) => l.trim());
  let pending = null;
  for (const line of lines) {
    const imp = line.match(/^import \* as (\w+) from '(@radix-ui\/[\w-]+)';$/);
    if (imp) {
      pending = { ns: imp[1], pkg: imp[2] };
      continue;
    }
    if (!pending) continue;
    const exp = line.match(/^export \{ \w+ as (\w+) \};$/);
    if (exp) {
      aggModToExport.set(pending.pkg, exp[1]);
      pending = null;
    }
  }
}

const components = [];

for (const dir of readdirSync(radixDir).filter((d) => d.startsWith('react-'))) {
  const dtsPath = join(radixDir, dir, 'dist', 'index.d.mts');
  if (!existsSync(dtsPath)) continue;
  const pkgName = `@radix-ui/${dir}`;
  const exported = aggModToExport.get(pkgName);
  if (!exported) continue; // 不在聚合包的稳定导出里
  if (UNSTABLE.test(exported)) continue;

  const raw = [...publicExports(dtsPath)];

  const parts = raw
    .filter((n) => !UNSTABLE.test(n) && !NOT_A_PART.has(n))
    // 去掉 Props 类型定义，它们不是可渲染的部件
    .filter((n) => !/Props$/.test(n))
    // 去掉全大写的类型常量
    .filter((n) => !/^[A-Z0-9_]+$/.test(n))
    // 与组件同名的根导出就是 Root 本身
    .filter((n) => n !== exported)
    // 同一部件有前缀长名与短名两种导出时，只保留短名
    .filter((n) => !raw.some((o) => o !== n && n.endsWith(o) && /^([A-Z][a-z0-9]+)+$/.test(o)))
    .sort((a, b) => a.localeCompare(b));

  components.push({
    pkg: pkgName,
    component: exported,
    parts: parts.sort((a, b) => a.localeCompare(b)),
  });
}

components.sort((a, b) => a.component.localeCompare(b.component));

const totalParts = components.reduce((n, c) => n + c.parts.length, 0);
writeFileSync(
  join(root, 'src', 'data', 'parts.json'),
  JSON.stringify(
    {
      generatedFrom: 'node_modules/@radix-ui/*/dist/index.d.mts (public export statements)',
      componentCount: components.length,
      totalParts,
      components,
    },
    null,
    2,
  ) + '\n',
);

console.log(`components: ${components.length}  parts: ${totalParts}\n`);
for (const c of components) {
  console.log(`${c.component.padEnd(20)} ${String(c.parts.length).padStart(2)}  ${c.parts.join(' ')}`);
}