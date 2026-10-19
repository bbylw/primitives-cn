/** 打印各分类的真实组件数，用于核对文档里的表格 */
import { components, CATEGORY_LABELS, CATEGORY_ORDER } from '../src/data/components.ts';

let total = 0;
for (const cat of CATEGORY_ORDER) {
  const list = components.filter((c) => c.category === cat);
  total += list.length;
  console.log(
    `${CATEGORY_LABELS[cat].padEnd(8)} ${String(list.length).padStart(2)}  ${list
      .slice(0, 4)
      .map((c) => c.name)
      .join(', ')}`,
  );
}
console.log('合计', total, '· 部件', components.reduce((n, c) => n + c.parts.length, 0));